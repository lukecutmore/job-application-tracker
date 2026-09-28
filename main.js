const addButton = document.getElementById("application-btn")
const companyInput = document.getElementById("company-text")
const roleInput = document.getElementById("role-text")
const statusSelect = document.getElementById("status-select")
const applicationList = document.getElementById("application-list")
const applicationNumber = document.getElementById("application-number")
const appliedNumber = document.getElementById("applied-number")
const interviewNumber = document.getElementById("interview-number")
const rejectedNumber = document.getElementById("rejected-number")
const offerNumber = document.getElementById("offer-number")

const applications = JSON.parse(localStorage.getItem("applications")) || []

for (let i = 0; i < applications.length; i++) {
    renderApplication(applications[i])
}

updateStats()

function renderApplication(application) {
  
const listItem = document.createElement("li")
listItem.textContent = `${application.company}, ${application.role}, ${application.status}`

applicationList.appendChild(listItem)

const deleteButton = document.createElement("button")
deleteButton.textContent = "Delete"
listItem.appendChild(deleteButton)

deleteButton.addEventListener("click", () => {
    const index = applications.indexOf(application)
    listItem.remove()
    applications.splice(index, 1)
    localStorage.setItem("applications", JSON.stringify(applications))
    updateStats();

})

}
 
addButton.addEventListener("click", () => {

    
    if (companyInput.value.trim() === "" || roleInput.value.trim() === "") {
        return 
    }

    const application = {
        company: companyInput.value,
        role: roleInput.value,
        status: statusSelect.value

    }
    applications.push(application)
    localStorage.setItem("applications", JSON.stringify(applications))
    renderApplication(application)
    updateStats()
    
companyInput.value = ""
roleInput.value = ""
statusSelect.value = "Applied"

})

function updateStats() {
    let appliedCount = 0
    let interviewCount = 0
    let rejectedCount = 0
    let offerCount = 0

for (let i = 0; i < applications.length; i++) {
    
    if (applications[i].status === "Applied") {
      appliedCount++
    } else if (applications[i].status === "Interview") {
        interviewCount++
    } else if (applications[i].status === "Rejected") {
        rejectedCount++
    } else if (applications[i].status === "Offer") {
        offerCount++
    }
} 
    appliedNumber.textContent = `Applied: ${appliedCount}`
    interviewNumber.textContent = `Interview: ${interviewCount}`
    rejectedNumber.textContent = `Rejected: ${rejectedCount}`
    offerNumber.textContent = `Offer: ${offerCount}`
    applicationNumber.textContent = `Applications: ${applications.length}`

}
