# Beautiful Jekyll

[LICENSE](https://github.com/daattali/beautiful-jekyll/blob/master/LICENSE)

---

## Use

# Customizing parameters for each page

**One last important thing**: In order to have your new pages use this template and not just be plain HTML pages, **you must add [YAML front matter](https://jekyllrb.com/docs/front-matter/) to the top of each page**:

```
---
---
```

This is where you'll be able to give each page some extra parameters (such as a title, a subtitle, an image, etc - [below is a list of all parameters](#supported-parameters)). Add any parameters you want between these two dashed lines, for example:

```
---
title: Contact me
subtitle: Here you'll find all the ways to get in touch with me
---
```

If you don't want to use any parameters on a page, you still need to use the two dashed lines. If you don't, then your file will be shown as-is without the Beautiful Jekyll template.

You can look at the top of [`aboutme.md`](https://raw.githubusercontent.com/daattali/beautiful-jekyll/master/aboutme.md) as an example.

**Important takeaway: ALWAYS add the YAML front matter, which is two lines of three dashes, to EVERY page. If you have any parameters, they go between the two lines.**

# Supported parameters

Below is a list of the parameters that Beautiful Jekyll supports (any of these can be added to the YAML front matter of any page). Remember to also look in the `_config.yml` file to see additional site-wide settings.

## Main parameters

These are the basic YAML parameters that you are most likely to use on most pages.

| Parameter     | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title         | Page or blog post title                                                                                                                                                                                                                                                                                                                                                                                              |
| subtitle      | Short description of page or blog post that goes under the title                                                                                                                                                                                                                                                                                                                                                     |
| tags          | List of tags to categorize the post. Separate the tags with commas and place them inside square brackets. Example: `[personal, analysis, finance]`                                                                                                                                                                                                                                                                   |
| cover-img     | Include a large full-width image at the top of the page. You can either provide the path to a single image (eg. `"/path/to/img"`) , or a list of images to cycle through (eg. `["/path/img1", "/path/img2"]`). If you want to add a caption to an image, then you must use the list notation (use `[]` even if you have only one image), and each image should be provided as `"/path/to/img" : "Caption of image"`. |
| thumbnail-img | For blog posts, if you want to add a thumbnail that will show up in the feed, use `thumbnail-img: /path/to/image`. If no thumbnail is provided, then `cover-img` will be used as the thumbnail. You can use `thumbnail-img: ""` to disable a thumbnail.                                                                                                                                                              |
| comments      | If you want do add comments to a specific page, use `comments: true`. Comments only work if you enable one of the comments providers (Facebook, disqus, staticman, utterances, giscus, CommentBox) in `_config.yml` file. Comments are automatically enabled on blog posts but not on other pages; to turn comments off for a specific post, use `comments: false`.                                                  |

## Parameters for SEO and social media sharing

These parameters let you control what information shows up when a page is shown in a search engine (such as Google) or gets shared on social media (such as Twitter/Facebook).

| Parameter         | Description                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| share-title       | A title for the page. If not provided, then `title` will be used, and if that's missing then the site title (from `_config.yml`) is used.            |
| share-description | A brief description of the page. If not provided, then `subtitle` will be used, and if that's missing then an excerpt from the page content is used. |
| share-img         | The image to show. If not provided, then `cover-img` or `thumbnail-img` will be used if one of them is provided.                                     |

## Less commonly used parameters

These are parameters that you may not use often, but can come in handy sometimes.

| Parameter    | Description                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| readtime     | If you want a post to show how many minutes it will take to read it, use `readtime: true`.                                                                                                             |
| show-avatar  | If you have an avatar configured in the `_config.yml` but you want to turn it off on a specific page, use `show-avatar: false`.                                                                        |
| social-share | By default, every blog post has buttons to share the page on social media. If you want to turn this feature off, use `social-share: false`.                                                            |
| nav-short    | By default, the navigation bar gets shorter after scrolling down the page. If you want the navigation bar to always be short on a certain page, use `nav-short: true`                                  |
| gh-repo      | If you want to show GitHub buttons at the top of a post, this sets the GitHub repo name (eg. `daattali/beautiful-jekyll`). You must also use the `gh-badge` parameter to specify what buttons to show. |
| gh-badge     | Select which GitHub buttons to display. Available options are: [star, watch, fork, follow]. You must also use the `gh-repo` parameter to specify the GitHub repo.                                      |
| last-updated | If you want to show that a blog post was updated after it was originally released, you can specify an "Updated on" date.                                                                               |
| layout       | What type of page this is (default is `post` for blog posts and `page` for other pages). See _Page types_ section below for more information.                                                          |

## Advanced parameters

These are advanced parameters that are only useful for people who need very fine control over their website.

| Parameter      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| footer-extra   | If you want to include extra content below the social media icons in the footer, create an HTML file in the `_includes/` folder (for example `_includes/myinfo.html`) and set `footer-extra` to the name of the file (for example `footer-extra: myinfo.html`). Accepts a single file or a list of files.                                                                                                                                                                  |
| before-content | Similar to `footer-extra`, but used for including HTML before the main content of the page (below the title).                                                                                                                                                                                                                                                                                                                                                              |
| after-content  | Similar to `footer-extra`, but used for including HTML after the main content of the page (above the footer).                                                                                                                                                                                                                                                                                                                                                              |
| head-extra     | Similar to `footer-extra`, but used if you have any HTML code that needs to be included in the `<head>` tag of the page.                                                                                                                                                                                                                                                                                                                                                   |
| language       | HTML language code to be set on the page's &lt;html&gt; element.                                                                                                                                                                                                                                                                                                                                                                                                           |
| full-width     | By default, page content is constrained to a standard width. Use `full-width: true` to allow the content to span the entire width of the window.                                                                                                                                                                                                                                                                                                                           |
| js             | List of local JavaScript files to include in the page (eg. `/assets/js/mypage.js`)                                                                                                                                                                                                                                                                                                                                                                                         |
| ext-js         | List of external JavaScript files to include in the page (eg. `//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js`). External JavaScript files that support [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) can be specified using the `href` and `sri` parameters eg.<br/>`href: "//code.jquery.com/jquery-3.1.1.min.js"`<br/>`sri: "sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="` |
| css            | List of local CSS files to include in the page                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ext-css        | List of external CSS files to include in the page. External CSS files using SRI (see `ext-js` parameter) are also supported.                                                                                                                                                                                                                                                                                                                                               |

## Page types

- **post** - To write a blog post, add a markdown or HTML file in the `_posts` folder. As long as you give it YAML front matter (the two lines of three dashes), it will automatically be rendered like a blog post. Look at the existing blog post files to see examples of how to use YAML parameters in blog posts.
- **page** - Any page outside the `_posts` folder that uses YAML front matter will have a very similar style to blog posts.
- **home** - The home layout is meant to act as the homepage of your blog posts - it will display all your blog posts, sorted from newest to oldest. A file using the `home` layout must be named `index.html` (not `index.md` or anything else!).
- **minimal** - If you want to create a page with minimal styling (ie. without the bulky navigation bar and footer), assign `layout: minimal` to the YAML front matter.
- If you want to completely bypass the template engine and just write your own HTML page, simply omit the YAML front matter. Only do this if you know how to write HTML!



 
