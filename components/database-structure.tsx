"use client"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

interface Column {
  name: string
  type: string
  nullable: boolean
  key?: string
}

const sampleStructure: Record<string, Column[]> = {
  users: [
    { name: "id", type: "integer", nullable: false, key: "PK" },
    { name: "email", type: "varchar(255)", nullable: false },
    { name: "name", type: "varchar(255)", nullable: true },
    { name: "created_at", type: "timestamp", nullable: false },
  ],
  products: [
    { name: "id", type: "integer", nullable: false, key: "PK" },
    { name: "name", type: "varchar(255)", nullable: false },
    { name: "price", type: "decimal(10,2)", nullable: false },
    { name: "category_id", type: "integer", nullable: true, key: "FK" },
  ],
}

export function DatabaseStructure({ selectedTable, projectId }: { selectedTable: string; projectId: string }) {
  const [columns, setColumns] = useState<Column[]>([])

  useEffect(() => {
    // Load structure from session storage if it exists
    const storedStructure = sessionStorage.getItem(`tableStructure_${projectId}_${selectedTable}`)
    if (storedStructure) {
      setColumns(JSON.parse(storedStructure))
    } else {
      // If no structure in session storage, use sample structure
      setColumns(sampleStructure[selectedTable] || [])
      sessionStorage.setItem(
        `tableStructure_${projectId}_${selectedTable}`,
        JSON.stringify(sampleStructure[selectedTable] || []),
      )
    }
  }, [selectedTable, projectId])

  if (!selectedTable) {
    return <div className="text-center text-muted-foreground py-8">Select a table to view its structure</div>
  }

  return (
    <Card>
      <div className="p-4">
        <h3 className="font-semibold mb-4">Table Structure: {selectedTable}</h3>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nullable</TableHead>
                <TableHead>Key</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column) => (
                <TableRow key={column.name}>
                  <TableCell>{column.name}</TableCell>
                  <TableCell>{column.type}</TableCell>
                  <TableCell>{column.nullable ? "Yes" : "No"}</TableCell>
                  <TableCell>{column.key || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}

