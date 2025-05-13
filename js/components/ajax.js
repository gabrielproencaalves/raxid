export default function ajax(
    {
        type = null, data = null, url = null, success = null,
        statusCode = null, beforeSend = null,fail = null,done= null
    } = {}){

    $.ajax({
        type: type,
        data: data,
        url: url,
        success:success,
        statusCode:statusCode,
        beforeSend:beforeSend,
        fail:fail,
        complete:done
   });
}

