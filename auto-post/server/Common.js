/**
 * Created by vungo on 3/20/2016.
 */
AutoPosts = new Mongo.Collection("autoPosts");

Meteor.startup(function() {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "397089360415500",
    loginStyle: "popup",
    secret: "f884942fbe0845ad573fcd551fa2aceb"
  });
})

Meteor.startup(function() {
  ServiceConfiguration.configurations.remove({
    service: "twitter"
  });
  ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: "e4PIUuPZkt7iiVM4ygJaKUkrr",
    loginStyle: "popup",
    secret: "NuCXMzXORMFu6cdzF9zO8KCelhEwzOcgGqagRfm3ftz7iPjJ6I"
  });
})

Meteor.startup(function () {
    // insert dummy content only if createDummyContent hasn't happened and there aren't any posts in the db
    if (!Events.findOne({name: 'createStartupContent'}) && !Posts.find().count()) {
        createStartupUsers();
        Events.log({name: 'createStartupContent', unique: true, important: true});
    }
    createStartupUsers();
});

queuePostLinks = [];
isDoingAutoPost = false;

createAutoPostFromLink = function (url, time, category, callback) {
    console.log("createAutoPostFromLink", url);
    Meteor.call('getEmbedlyData', url, function (error, data) {
        if (error) {
            console.log(error);
            if(callback)
                callback();
            return;
        }
        if (data) {
            if(data.title && data.description)
            {
                createAutoPost(url, data.title, data.description, time, getRandomBotUsername(), category, data.thumbnailUrl);
            }
        }
        if(callback)
            callback();
    });
};

getRandomBotUsername = function()
{
    var botIdx = Math.floor(Math.random()* BotUsers.length);
    if (botIdx >= BotUsers.length)
    {
        botIdx = BotUsers.length - 1;
    }
    return BotUsers[botIdx].username;
};
createAutoPost = function (url, title, body, postedAt, username, category, thumbnail) {
    try{

        var post = {
            postedAt: postedAt,
            body: body,
            title: title,
            url:url,
            userId: Meteor.users.findOne({username: username})._id
        };
        if (typeof thumbnail !== "undefined")
            post.thumbnailUrl = thumbnail;

        var cat = Categories.findOne({name: category});
        if(cat)
        {
            post.categories = [cat._id];
        }

        Posts.methods.new(post);

    }
    catch (error){
        console.log(error);
    }

};

createStartupUsers = function () {
    for (var i = 0; i < BotUsers.length; i++)
    {
        try {
            Accounts.createUser(BotUsers[i]);
        }
        catch (error){
                console.log(error);
            }
    }
};

isAutoPostedLink = function(link)
{
    for (var i = 0; i < postedLinks.length; i++)
    {
        if(link == postedLinks[i])
        {
            return true;
        }
    }
    for ( i = 0; i < queuePostLinks.length; i++)
    {
        if(link == queuePostLinks[i].link)
        {
            return true;
        }
    }
    return false;
};
addToQueueAutoPost = function(link, category, time)
{
    if (Users.is.admin(Meteor.user())) {
        console.log("addToQueueAutoPost: ", link, category);
        if(category != null && !Categories.findOne({name: category}))
        {
            Categories.insert({
                name: category,
                description: category,
                order: 1,
                slug:Telescope.utils.slugify(category),
                parentId: '',
                image:''
            });
        }
        queuePostLinks.push({
            link: link,
            category: category,
            time: time
        });
        checkAutoPost();
    }
};
checkAutoPost = function()
{
    if(!isDoingAutoPost && queuePostLinks.length > 0)
    {
        isDoingAutoPost = true;
        var item = queuePostLinks[0];
        queuePostLinks.shift();
        var time = item.time;
        if(time == null || time <= 0)
           time = Date.now();
        createAutoPostFromLink(item.link, time,item.category, function()
        {
            isDoingAutoPost = false;
            checkAutoPost();
        });
    }
};

Meteor.methods({
    addToQueueAutoPost: function (url, category, time) {
        return addToQueueAutoPost(url, category, time);
    }
});
