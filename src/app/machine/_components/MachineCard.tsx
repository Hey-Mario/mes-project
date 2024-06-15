import { IMachine } from '@/common/interfaces/IMachine';
import React from 'react';
import { Badge } from 'antd';

const MachineCard = ({ machine }: { machine: IMachine }) => {
  return (
    <div className='py-5 px-10 border-black border-2'>
      <span>{machine.getName()}</span> <br />
      <Badge status={machine.isOn ? 'success' : 'error'} className='size-4' />
    </div>
  )
}

export default MachineCard