from rest_framework.pagination import PageNumberPagination


# Get paginated response from queryset
def get_paginated_response(queryset, serializers, request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginator.page_query_param = 'page'

    paginated_queryset = paginator.paginate_queryset(queryset, request)
    paginated_serializers = serializers(paginated_queryset, many=True, context={'request': request})

    return paginator.get_paginated_response(paginated_serializers.data)