$(document).ready(function() {

  // escape function to transform possible malicious strings from user inputs
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // create an HTML markup for a new tweet
  const createTweetElement = (tweetData) => {
    const tweet = `<article class="tweet">
    <header>
    <div class="tweet-author">
    <div>
    <img src="${tweetData.user.avatars}" alt="tweet-author-icon">
    <span class="tweet-author-name">${tweetData.user.name}</span>
    </div>
    <span class="tweet-author-handle">${tweetData.user.handle}</span>
    </div>
    <p class="tweet-text">${escape(tweetData.content.text)}</p>
    </header>
    <footer>
    <span>${timeago.format(tweetData.created_at)}</span>
    <div class="tweet-icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>`;
    return tweet;
  };

  // fetch tweets
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .done(tweets => renderTweets(tweets))
      .fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
  };

  // reset new-tweet creation area and display tweets
  const renderTweets = (tweets) => {
    $(".counter").text("140");
    $(".all-tweets").empty();
    $("#tweet-text").val("");
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $(".all-tweets").prepend(newTweet);
    }
  };

  // set listener for tweet button
  $(".tweet-form").on("submit", function(e) {
    e.preventDefault();
    const tweetText = $("#tweet-text").val();
    
    // validate form data and display errors
    if (tweetText.trim() === "") {
      $(".error").text("Tweet cannot be empty!");
      $(".error").fadeIn("fast");
      setTimeout(() => {
        $(".error").fadeOut("fast");
      }, 3000);
      return;
    }
    
    if (tweetText.length > 140) {
      $(".error").text("Tweet is too long!");
      $(".error").fadeIn("fast");
      setTimeout(() => {
        $(".error").fadeOut("fast");
      }, 3000);
      return;
    }
    
    // serialize and make a post request
    const formData = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: formData })
      .done(loadTweets)
      .fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
  });
  
  // fetch tweets on page load
  loadTweets();
});

