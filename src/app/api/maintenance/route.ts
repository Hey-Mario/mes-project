import { NextApiRequest, NextApiResponse } from 'next';
import { Machine } from '../../../common/classes/visitor/Machine';
import { Equipment } from '../../../common/classes/visitor/Equipment';
import { MaintenanceVisitor } from '../../../common/classes/visitor/MaintenanceVisitor';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const machine = new Machine("Machine A", "Operational", 120);
        const equipment = new Equipment("Drill", "Good", 80);

        const maintenanceVisitor = new MaintenanceVisitor();

        machine.accept(maintenanceVisitor);
        equipment.accept(maintenanceVisitor);

        res.status(200).json({ message: "Maintenance and inspection completed successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
