import uuid

from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import ugettext_lazy as _

from django_currentuser.db.models import CurrentUserField
from django_currentuser.middleware import get_current_authenticated_user
from taggit.managers import TaggableManager

from .decorators import atomic_transaction_singleton


class Transactionable(models.Model):
    @atomic_transaction_singleton
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    @atomic_transaction_singleton
    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)

    class Meta:
        abstract = True


class Uuidable(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    @property
    def persisted(self):
        return self.__class__.objects.filter(id=self.id).exists()

    class Meta:
        abstract = True


class Authorable(models.Model):
    OWNERSHIP_FIELD = "creation_user"

    creation_datetime = models.DateTimeField(
        _("fecha de creación"), auto_now_add=True, blank=False, null=False, editable=False
    )
    modification_datetime = models.DateTimeField(
        _("fecha de modificación"), auto_now=True, blank=False, null=False, editable=False
    )

    creation_user = CurrentUserField(
        blank=True,
        verbose_name=_("usuario de creación"),
        on_delete=models.PROTECT,
        related_name="%(app_label)s_%(class)s_creations",
    )
    modification_user = CurrentUserField(
        on_update=True,
        blank=True,
        verbose_name=_("usuario de modificación"),
        on_delete=models.PROTECT,
        related_name="%(app_label)s_%(class)s_modifications",
    )

    class Meta:
        abstract = True


class Eventable(models.Model):
    events = GenericRelation(
        "events.Event",
        content_type_field="link_content_type",
        object_id_field="link_object_id",
        related_query_name="%(app_label)s_%(class)s",
    )

    class Meta:
        abstract = True


class Notifiable(models.Model):
    notifications = GenericRelation(
        "notifications.Notification",
        content_type_field="target_content_type",
        object_id_field="target_object_id",
        related_query_name="%(app_label)s_%(class)s",
    )

    @property
    def notification_str(self):
        return f"{self}"

    @property
    def notification_sender(self):
        return get_current_authenticated_user() or get_user_model().objects.get_random_admin()

    class Meta:
        abstract = True


class Taggable(Uuidable):
    tags = TaggableManager(through="common.TaggedItem", blank=True)

    class Meta:
        abstract = True
