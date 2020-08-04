/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

module.exports = {
  notificationType: {
    'TASK_CREATE': 'Created Task & Assigned to',
    'TASK_ASSIGN': 'Assigned to',
    'STATUS_UPDATE': 'Updated Status',
    'DUE_DATE_UPDATE': 'Updated Due Date',
    'COMMENT_CREATE': 'Commented',
    'TASK_UPDATE': 'Updated'
  },
  status: {
    'To do': 'To do',
    // 'PENDING': 'Pending',
    'In Progress': 'In Progress',
    'In Review': 'In Review',
    'In Testing': 'In Testing',
    'Done': 'Done',
  },
  colorScheme: {
    'To do': 'rgb(123, 104, 238)',
    // 'PENDING': 'rgb(80, 227, 194)',
    'In Progress': 'rgb(8, 173, 255)',
    'In Review': 'rgb(255, 207, 0)',
    'In Testing': 'rgb(255, 0, 223)',
    'Done': 'rgb(107, 201, 80)'
  }
}