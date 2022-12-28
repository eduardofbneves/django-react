from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from project import views
from project.views import ProjectView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
#from django.conf.urls import url
from django.urls import path
from rest_framework.schemas import get_schema_view
from django.views.generic.base import RedirectView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'projects', views.ProjectView, 'project')
router.register(r'product', ProjectView, basename='Product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    path('', RedirectView.as_view(
         url='/api/', permanent=False)),    
    path('api/', get_schema_view()),
    path('api/auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    path('api/auth/token/obtain/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
   
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from rest_framework import views, serializers, status
from rest_framework.response import Response
class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
    
class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED)
        
