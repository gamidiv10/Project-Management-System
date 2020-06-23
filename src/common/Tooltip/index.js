import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TooltipWrapper = ({
  placement = 'auto',
  tooltip,
  children,
  tooltipProps,
  tooltipComponent: Component,
  ...rest
}) => {

  return <OverlayTrigger
    placement={placement}
    overlay={
      <Tooltip id={`tooltip-${placement}`} {...tooltipProps}>
        {tooltip || Component}
      </Tooltip>
    }
    {...rest}
  >
    {children}
  </OverlayTrigger>
}

export default TooltipWrapper