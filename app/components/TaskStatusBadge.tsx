import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<
  Status, 
  { label: string, color: 'orange' | 'blue' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'orange' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue' },
  CLOSED: { label: 'Closed', color: 'green' }
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color} size="1">
      {statusMap[status].label}
    </Badge>
  )
}

export default TaskStatusBadge