  const container = document.getElementById("issueContainer")
const spinner = document.getElementById("spinner")
const tabs = document.querySelectorAll(".tab")

 
const issuesAPI = "https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issues"
const issueDetailsAPI = "https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issue/"
const searchIssuesAPI = "https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q="


 
const loadIssues = (type="all") => {

spinner.classList.remove("hidden")

fetch(issuesAPI)
.then((res)=> res.json())
.then((data)=>{

spinner.classList.add("hidden")

let issues = data.data


if(type==="open"){
issues = issues.filter(i=> i.status==="open")
}

if(type==="closed"){
issues = issues.filter(i=> i.status==="closed")
}

displayIssues(issues)

})

}


 
const displayIssues = (issues)=>{

container.innerHTML=""

document.getElementById("issueCount").innerText =
issues.length + " Issues"



issues.forEach(issue=>{

let card=document.createElement("div")

card.className=`bg-white rounded-lg shadow border-t-4 p-4 hover:shadow-lg transition cursor-pointer
${issue.status==="open" ? "border-green-500" : "border-purple-500"}
`


card.innerHTML=`

<div class="flex justify-between items-center mb-3">

<div class="flex items-center gap-2">

<img src="${issue.status==="open"
? "assets/Open-Status.png"
: "assets/Closed- Status .png"}"
class="w-5 h-5"/>

<span class="text-xs font-semibold text-gray-500 uppercase">
${issue.status}
</span>

</div>


<span class="px-3 py-1 text-xs font-semibold rounded-full
${issue.priority==="HIGH"
? "bg-red-100 text-red-600"
: issue.priority==="MEDIUM"
? "bg-yellow-100 text-yellow-600"
: "bg-gray-100 text-gray-600"}">

${issue.priority}

</span>

</div>



<h2 class="font-semibold text-sm mb-2 leading-5">
${issue.title}
</h2>



<p class="text-xs text-gray-500 mb-4">
${issue.description.slice(0,80)}...
</p>



<div class="flex gap-2 mb-4">

<span class="text-xs border border-red-300 text-red-500 px-2 py-1 rounded">
BUG
</span>

<span class="text-xs border border-orange-300 text-orange-500 px-2 py-1 rounded">
HELP WANTED
</span>

</div>



<div class="flex justify-between items-center text-xs text-gray-400">

<span>
#${issue.id} by ${issue.author}
</span>

<span>
${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>

`

card.onclick = ()=> loadIssueDetails(issue.id)

container.appendChild(card)

})

}


 
const loadIssueDetails = (id)=>{

const url = issueDetailsAPI + id

fetch(url)
.then((res)=> res.json())
.then((data)=>{

displayIssueDetails(data.data)

})

}


 
const displayIssueDetails = (issue)=>{

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalAuthor2").innerText = issue.author
document.getElementById("modalPriority").innerText = issue.priority
document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString()

document.getElementById("issueModal").showModal()

}


 
const searchIssue = ()=>{

let text = document.getElementById("searchInput").value

const url = searchIssuesAPI + text

fetch(url)
.then((res)=> res.json())
.then((data)=>{

displayIssues(data.data)

})

}


 
function setActiveTab(btn){

tabs.forEach(tab=>tab.classList.remove("tab-active"))

btn.classList.add("tab-active")

}


 
loadIssues()