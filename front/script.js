// const axios = require('axios')

const yourlink = document.querySelector("#outputtext")
const UrlInput = document.querySelector('#urlinput')
const shortcode = document.querySelector('#shortcode')
const analyticsbox = document.querySelector('#analytics')

let link = ""
let shortlink = ""

function inputchange(value) {
  link = value;
}

let shortid = ""
function analytics(value) {
  shortid = value;
  //console.log(shortid)
}


let short = ""
async function sendRequest() {
  const a = 'https://url-shortner-rishabs-projects-f4158a5e.vercel.app/url/'
  axios.post(a, {
    url: link
  })
    .then(function (response) {
      console.log(response);
      shortlink = a + response.data.id
      yourlink.textContent = shortlink
      shortcode.textContent = response.data.id
      short = response.data.id
      yourlink.href = shortlink
      console.log(shortlink)
      UrlInput.value = ""
    })
    .catch(function (error) {
      console.log(error);
    });

}



async function sendanalytics() {
  const a = `https://url-shortner-rishabs-projects-f4158a5e.vercel.app/analytics/${shortid}`
  await axios.get(a, {
  })
    .then(function (response) {
      console.log(response.data);
      tc.textContent = "Total Clicks: " + response.data.totalClicks
    })
    .catch(function (error) {
      console.error('Error fetching analytics data:', error);
    });

}

// copy short link function
function copylink() {
  navigator.clipboard.writeText(shortlink)
    .then(() => {
      console.log('Text successfully copied to clipboard: ' + shortlink);
    })
    .catch(err => {
      console.error('Error in copying text: ', err);
    });

}
// copy short code function
function copycode() {
  navigator.clipboard.writeText(short)
    .then(() => {
      console.log('Text successfully copied to clipboard: ' + short);
    })
    .catch(err => {
      console.error('Error in copying text: ', err);
    });

}

