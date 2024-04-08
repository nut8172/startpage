/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","#new":"","#new-0":""}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ATKtFCFsMphgwI6Z","label":"LLB_grind","bookmarks":[{"id":"KeyI8bxJApkdsK9g","label":"Criminal Law 2 ","url":"https://canvas.swansea.ac.uk/courses/46098"},{"id":"bFRWk3foIbZhqVD9","label":"Equity & Trusts 2","url":"https://canvas.swansea.ac.uk/courses/46102"},{"id":"KXvlvBMlElSK8owD","label":"Land Law 2 ","url":"https://canvas.swansea.ac.uk/courses/46138"},{"id":"PCtGhomkV7DkeTMo","label":"FILP (Foundations In Legal Practice)","url":"https://canvas.swansea.ac.uk/courses/46205"}]},{"id":"py1CVTMta3Ud8jff","label":"Tools","bookmarks":[{"id":"ZfbqXRVnscIZcBGp","label":"google scholar","url":"https://scholar.google.com/"},{"id":"gRDlBc4kThOEHEzO","label":"Law Trove","url":"https://www.oxfordlawtrove.com/"},{"id":"vdjM8lp9SwOCMnuF","label":"West Law","url":"https://uk.westlaw.com/Browse/Home/WestlawUk?transitionType=Default&contextData=(sc.Default)"},{"id":"IH0Gup9MQmV2wUCd","label":"lexis","url":"https://plus.lexis.com/uk/xhome?federationidp=RNWMKK59447&cbc=0%2C0&crid=d8e02939-5928-440b-9d60-32c28348d356"}]},{"id":"83v8CLLXjYhssmgl","label":"text books","bookmarks":[{"id":"Ugw8QF0SlYcXwKZ0","label":"criminal law ","url":"https://revel-ise.pearson.com/courses/65c36a264375791d276c150e/dashboard"},{"id":"iXPM8OC6XhKgAZta","label":"land law","url":"https://www.oxfordlawtrove.com/display/10.1093/he/9780192856760.001.0001/he-9780192856760-chapter-1?rskey=s1jkDf&result=4"},{"id":"RhrGisKBuWra4XZN","label":"equity_trust","url":"https://www.oxfordlawtrove.com/display/10.1093/he/9780192857170.001.0001/he-9780192857170?rskey=lcjTQS&result=2"},{"id":"cU7ehlQAAZU6tPT2","label":"libgen","url":"https://libgen.rs/"}]},{"id":"cdB0XLP3Iu4PV8Y8","label":"email+uni","bookmarks":[{"id":"xvpxMHBlUYU76k1d","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"NF7virWIc6HzX1eJ","label":"outlook","url":"https://outlook.office.com/mail/"},{"id":"lojK5Vg1a32duWnn","label":"dashboard","url":"https://canvas.swansea.ac.uk/"},{"id":"VxkWnhMtU2t2LLVg","label":"student profile ","url":"https://intranet.swan.ac.uk/studentprofile/profilesummarydetails.aspx?guid=f305722c-577d-41d5-a186-1cfa6f409229"}]},{"id":"lKZrmq5xB2DOLjwd","label":"Misc","bookmarks":[{"id":"FudfHFDhJ5dj76bp","label":"calender ","url":"https://calendar.google.com/calendar/u/0/r"},{"id":"cKthgxeBlPAA81ft","label":"github","url":"https://github.com/nut8172/2216655-Vault"},{"id":"Ci4AyB9rgDH9N7Gl","label":"piratebay","url":"https://prbay.online/"},{"id":"X7Up9z2NX7RDTuiF","label":"youtube","url":"https://www.youtube.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
