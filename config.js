// These URL paths will be transformed to CN mirrors.
var mirrors = {
  "//codelabs.developers.google.com"            : "developer.android.google.cn",
  "//developers.google.com"     : "developers.google.cn",
  "//firebase.google.com"       : "firebase.google.cn",
  "//developer.android.com"     : "developer.android.google.cn",
  "//source.android.com"        : "source.android.google.cn",
  "//www.tensorflow.org"        : "tensorflow.google.cn",
  "//tfhub.dev"                 : "hub.tensorflow.google.cn",
  "//angular.io"                : "angular.cn",
  "//translate.google.com"      : "translate.google.cn",
  "//careers.google.com"        : "careers.google.cn",
  "//golang.org"                : "golang.google.cn",
  "//sum.golang.org"            : "sum.golang.google.cn"
};

// These URL paths are not available on CN mirrors, therefore won't be transformed.
var skiplist = [
  "//careers.google.com/jobs"
];

function redirectRules() {
  let res = [];
  let id = 1;
  for (const url of skiplist) {
    res.push({
      "id": id++,
      "action": {
        "type": "allow"
      },
      "condition": {
        "urlFilter": url,
        "excludedResourceTypes": ["other"],
        "isUrlFilterCaseSensitive": false
      }
    });
  }
  for (const key in mirrors) {
    res.push({
      "id": id++,
      "action": {
        "type": "redirect",
        "redirect": {
          "transform": {
            "host": mirrors[key]
          }
        }
      },
      "condition": {
        "urlFilter": key,
        "excludedResourceTypes": ["other"],
        "isUrlFilterCaseSensitive": false
      }
    });
  }
  return res;
}

// Export rules to 'rules.json' (node.js is required)
const fs = require('fs');
fs.writeFile('rules.json', JSON.stringify(redirectRules()), err => {
  if (err) {
    console.error(err);
  } else {
    console.log('rules.json created.');
  }
});
