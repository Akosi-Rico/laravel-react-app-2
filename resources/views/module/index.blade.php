@extends('layouts.app')
@section("title", "Simple User Management")

<script>
    window.publicImagePath = @json(asset("/"));
    window.tcode = @json(AccessControl::loadPermission());
</script>
