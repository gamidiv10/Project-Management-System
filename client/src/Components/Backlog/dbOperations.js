
export const insert_issue = issue => {
    const issues = JSON.parse(localStorage.getItem("issues")) || []
    issues.push(issue)
    localStorage.setItem("issues", JSON.stringify(issues))
}

export const insert_sprint = sprint => {
    const sprints = JSON.parse(localStorage.getItem("sprints")) || []
    sprints.push(sprint)
    localStorage.setItem("sprints", JSON.stringify(sprints))
}

export const get_issues = () => {
    const issues = localStorage.getItem("issues")
    return issues ? JSON.parse(issues) : []
}

export const get_sprints = () => {
    const sprints = localStorage.getItem("sprints")
    return sprints ? JSON.parse(sprints) : []
}