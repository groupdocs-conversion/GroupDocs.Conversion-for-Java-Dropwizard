<#-- @ftlvariable name="" type="conversion" -->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<head>
    <title>GroupDocs.Conversion for Java Spring</title>
    <link type="text/css" rel="stylesheet" href="/assets/common/css/all.min.css">
    <link type="text/css" rel="stylesheet" href="/assets/common/css/v4-shims.min.css">
    <link type="text/css" rel="stylesheet" href="/assets/common/css/swiper.min.css">
    <link type="text/css" rel="stylesheet" href="/assets/common/css/circle-progress.css"/>
    <link type="text/css" rel="stylesheet" href="/assets/viewer/css/viewer.css"/>
    <link type="text/css" rel="stylesheet" href="/assets/viewer/css/viewer.mobile.css"/>
    <link type="text/css" rel="stylesheet" href="/assets/viewer/css/viewer-dark.css"/>
    <link type="text/css" rel="stylesheet" href="/assets/conversion/css/conversion.css"/>
    <link type="text/css" rel="stylesheet" href="/assets/conversion/css/conversion.mobile.css"/>
    <script type="text/javascript" src="/assets/common/js/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/common/js/swiper.min.js"></script>
    <script type="text/javascript" src="/assets/viewer/js/viewer.js"></script>
    <script type="text/javascript" src="/assets/conversion/js/tooltipster.bundle.min.js"></script>
    <script type="text/javascript" src="/assets/conversion/js/conversion.js"></script>
</head>
<body>
<div id="element"></div>
<script th:inline="javascript">
    $('#element').conversion({
        applicationPath: 'http://${globalConfiguration.application.hostAddress}:${globalConfiguration.server.httpPort?c}/conversion',
        download: ${globalConfiguration.common.download?c},
        upload: ${globalConfiguration.common.upload?c},
        rewrite: ${globalConfiguration.common.rewrite?c},
    });
</script>
</body>
</html>