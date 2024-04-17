/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
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

const bookmarks = [{"id":"sEpJSTWBSvlQFzWS","label":"llb grind","bookmarks":[{"id":"IbYdt1DLQe4AR897","label":"Criminal Law 2 ","url":"https://canvas.swansea.ac.uk/courses/46098"},{"id":"ctSLcS4bRIxFfI7g","label":"Equity & Trusts 2","url":"https://canvas.swansea.ac.uk/courses/46102"},{"id":"t8cUPVwxlFwvm7wF","label":"Land Law 2 ","url":"https://canvas.swansea.ac.uk/courses/46138"},{"id":"3usUIZrjHx1Y2nG1","label":"F.I.L.P","url":"https://canvas.swansea.ac.uk/courses/46205"}]},{"id":"SALgSeVkc2kYTqgL","label":"email + calendar","bookmarks":[{"id":"QUNvkEarjMddNFoB","label":"Main email","url":"https://mail.google.com/mail/u/1/#inbox"},{"id":"7h6G3FJ4sa9NhKjT","label":"Alt email","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"EFSy8nFm9QDGca2k","label":"Uni email","url":"https://outlook.office.com/mail/"},{"id":"O6UglZxL6zsPRRBW","label":"Google calander","url":"https://calendar.google.com/calendar/u/0/r/week?cid=http%3A%2F%2Fscientia-eu-v4-api-d1-04.azurewebsites.net%2F%2Fapi%2Fical%2Fc0fafdf7-2aab-419e-a69b-bbb9e957303c%2Fd6f6e580-cfe8-8304-77d3-b89b72dd7e95%2Ftimetable.ics"}]},{"id":"HXaPcUQwkXtUez8B","label":"textbook/reading","bookmarks":[{"id":"VOzGtPXcZHR6xX0e","label":"land law | law trove","url":"https://www.oxfordlawtrove.com/display/10.1093/he/9780192856760.001.0001/he-9780192856760-chapter-1?rskey=s1jkDf&result=4"},{"id":"eIlcsQirditEp8xC","label":"criminal law | e-revel ","url":"https://revel-ise.pearson.com/courses/65c36a264375791d276c150e/dashboard"},{"id":"SCjQsg2zgPNawMwl","label":"equity & trusts | law trove","url":"https://www.oxfordlawtrove.com/display/10.1093/he/9780192857170.001.0001/he-9780192857170?rskey=lcjTQS&result=2"},{"id":"vpXN8y0D2Nbje6Qh","label":"west law ","url":"https://uk.westlaw.com/Browse/Home/WestlawUk?transitionType=Default&contextData=(sc.Default)&firstPage=true"}]},{"id":"gFbfhUTtBcps1bJ1","label":"media","bookmarks":[{"id":"kMGlZTgfnqkJduZI","label":"YouTube","url":"https://www.youtube.com/"},{"id":"aq82faNiyQDHZaBp","label":"Netflix","url":"https://www.netflix.com/browse"},{"id":"5U6VTtxg0Y1J3WO6","label":"Genoanime","url":"https://genoanime.com/?__cf_chl_managed_tk__=pmd_gRk2KvtCo25ztdKF2tGq0uwv.uE7uFG4Huduwn_oO3Y-1631055175-0-gqNtZGzNAqWjcnBszRK9"},{"id":"taobuuuuPhD4MdfM","label":"1movieshd","url":"https://1movieshd.cc/"}]}]

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
