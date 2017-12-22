
let createTagArray = function(posts){
    let tagsArray = [];    
    let post;
    for(post in posts){
        let tags = posts[post].tags;
        let tag;
        for(tag in tags){
            let tagname = tags[tag].name
            tagsArray.push(tagname);
        }
    }
    return tagsArray
}

let calculateFontSize = function(tagCount, tagsArray){
    let totalTags = tagsArray.length;
    let fontFactor = 15;
    // (rate/tagCount * smooth) * 10 + base_font
    for(var key in tagCount) {
        if(tagCount.hasOwnProperty(key)) {
            element = tagCount[key]
            tagCount[key] = Math.round((((element/totalTags) * 10 ) * fontFactor) + 10);
        }
    }
    let fonts = tagCount;
    return fonts
}

let createTagCloud = function(){
    $.get(ghost.url.api('posts', {include: 'tags'}))
        .done(function (data){
            let host = $(location).attr('host');

            let posts = data.posts;
            let tags = createTagArray(posts);
            let tagCount = {};
            let i;
            tags.forEach(function(i) { 
                tagCount[i] = (tagCount[i] || 0)+1; 
            });

            let fonts = calculateFontSize(tagCount, tags);
            let tagNames = Object.keys(fonts);
            for( var tag in tagNames){
                element = tagNames[tag];
                tagClassName = element.toLowerCase().replace(' ', '-');                    
                var $tag = $(`<a class='tagCloudTag ${tagClassName}'>${element}</a>`);
                $("#tag-cloud").append($tag)
                $("a.tagCloudTag").each(function(){               
                    var element = $( this ).text();
                    tagClassName = element.toLowerCase().replace(' ', '-');                    
                    $(this).css("fontSize", fonts[element] + 'pt');
                    $(this).attr("href", 'http://' + host + '/insights/tag/' + tagClassName + '/')
                })
            }
        })
        .then(function(){
            var path = $(location).attr('pathname');
            activeTag = path.split('/')[3];
            console.log(activeTag);
            // activeTag.replace('-', ' ')
            $('.' + activeTag).addClass("active");
        })
        .fail(function (err){
            console.error(err);
        });
}

createTagCloud();