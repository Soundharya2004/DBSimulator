"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Database, TableIcon, Plus, Trash2, Edit, Eye, ArrowUpDown } from "lucide-react"
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

interface Table {
  name: string
  type: string
  columns: Column[]
  rows: Record<string, any>[]
}

interface Column {
  name: string
  type: string
}

const sampleTables: Table[] = [
  {
    name: "users",
    type: "table",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "role", type: "string" },
    ],
    rows: [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    ],
  },
  {
    name: "products",
    type: "table",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "string" },
      { name: "price", type: "number" },
      { name: "category", type: "string" },
    ],
    rows: [
      { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
      { id: 2, name: "Desk Chair", price: 199.99, category: "Furniture" },
      { id: 3, name: "Coffee Maker", price: 79.99, category: "Appliances" },
    ],
  },
]

export function ProjectDashboard({ projectId }: { projectId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [tables, setTables] = useState<Table[]>([])
  const [activeTab, setActiveTab] = useState("data")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [newTableName, setNewTableName] = useState("")
  const [newColumnName, setNewColumnName] = useState("")
  const [newColumnType, setNewColumnType] = useState("string")
  const [project, setProject] = useState<any>(null)
  const [filterField, setFilterField] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [isAddingTable, setIsAddingTable] = useState(false)
  const [newRecord, setNewRecord] = useState<Record<string, any>>({})
  const [editingRecord, setEditingRecord] = useState<Record<string, any> | null>(null)
  const [viewingRecord, setViewingRecord] = useState<Record<string, any> | null>(null)
  const [newTableColumns, setNewTableColumns] = useState<Column[]>([])

  useEffect(() => {
    const projectsData = JSON.parse(sessionStorage.getItem("projects") || "[]")
    const currentProject = projectsData.find((p: any) => p.id === projectId)
    if (currentProject) {
      setProject(currentProject)
      const storedTables = sessionStorage.getItem(`tables_${projectId}`)
      if (storedTables) {
        setTables(JSON.parse(storedTables))
      } else {
        setTables(sampleTables)
        sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(sampleTables))
      }
    } else {
      router.push("/dashboard")
    }
  }, [projectId, router])

  const handleCreateTable = () => {
    if (!newTableName.trim() || newTableColumns.length === 0) return

    const newTable: Table = {
      name: newTableName,
      type: "table",
      columns: newTableColumns,
      rows: [],
    }

    const updatedTables = [...tables, newTable]
    setTables(updatedTables)
    sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(updatedTables))
    setNewTableName("")
    setNewTableColumns([])
    setIsAddingTable(false)
    toast({
      title: "Table Created",
      description: `Successfully created table "${newTableName}"`,
    })
  }

  const handleDeleteTable = (tableName: string) => {
    const updatedTables = tables.filter((t) => t.name !== tableName)
    setTables(updatedTables)
    sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(updatedTables))
    if (selectedTable === tableName) {
      setSelectedTable(null)
    }
    toast({
      title: "Table Deleted",
      description: `Successfully deleted table "${tableName}"`,
    })
  }

  const handleAddRecord = () => {
    if (!selectedTable) return

    const table = tables.find((t) => t.name === selectedTable)
    if (!table) return

    const updatedTable = {
      ...table,
      rows: [...table.rows, newRecord],
    }

    const updatedTables = tables.map((t) => (t.name === selectedTable ? updatedTable : t))
    setTables(updatedTables)
    sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(updatedTables))
    setNewRecord({})
    setIsAddingRecord(false)
    toast({
      title: "Record Added",
      description: "Successfully added new record",
    })
  }

  const handleEditRecord = (index: number) => {
    if (!selectedTable) return

    const table = tables.find((t) => t.name === selectedTable)
    if (!table) return

    const updatedRows = [...table.rows]
    updatedRows[index] = editingRecord!

    const updatedTable = {
      ...table,
      rows: updatedRows,
    }

    const updatedTables = tables.map((t) => (t.name === selectedTable ? updatedTable : t))
    setTables(updatedTables)
    sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(updatedTables))
    setEditingRecord(null)
    toast({
      title: "Record Updated",
      description: "Successfully updated record",
    })
  }

  const handleDeleteRecord = (index: number) => {
    if (!selectedTable) return

    const table = tables.find((t) => t.name === selectedTable)
    if (!table) return

    const updatedRows = table.rows.filter((_, i) => i !== index)

    const updatedTable = {
      ...table,
      rows: updatedRows,
    }

    const updatedTables = tables.map((t) => (t.name === selectedTable ? updatedTable : t))
    setTables(updatedTables)
    sessionStorage.setItem(`tables_${projectId}`, JSON.stringify(updatedTables))
    toast({
      title: "Record Deleted",
      description: "Successfully deleted record",
    })
  }

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return
    setNewTableColumns([...newTableColumns, { name: newColumnName, type: newColumnType }])
    setNewColumnName("")
    setNewColumnType("string")
  }

  const filteredRows = selectedTable
    ? tables
        .find((t) => t.name === selectedTable)
        ?.rows.filter((row) =>
          filterField && filterValue
            ? String(row[filterField]).toLowerCase().includes(filterValue.toLowerCase())
            : true,
        )
        .sort((a, b) => {
          if (!sortColumn) return 0
          if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
          if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
          return 0
        }) || []
    : []

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Tables</div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsAddingTable(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {tables.map((table) => (
              <div
                key={table.name}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 ${
                  selectedTable === table.name ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                <button onClick={() => setSelectedTable(table.name)} className="flex items-center gap-2 flex-1">
                  <TableIcon className="h-4 w-4" />
                  <span className="text-sm">{table.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{table.rows.length}</span>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteTable(table.name)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedTable ? `Table: ${selectedTable}` : "Select a table"}
              </p>
            </div>
          </div>

          {selectedTable && (
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b rounded-none p-0">
                  <TabsTrigger value="data" className="rounded-none">
                    <TableIcon className="h-4 w-4 mr-2" />
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="structure" className="rounded-none">
                    <Database className="h-4 w-4 mr-2" />
                    Structure
                  </TabsTrigger>
                </TabsList>
                <div className="p-4">
                  <TabsContent value="data">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="filter-field">Filter:</Label>
                          <select
                            id="filter-field"
                            value={filterField}
                            onChange={(e) => setFilterField(e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="">Select field</option>
                            {tables
                              .find((t) => t.name === selectedTable)
                              ?.columns.map((column) => (
                                <option key={column.name} value={column.name}>
                                  {column.name}
                                </option>
                              ))}
                          </select>
                          <Input
                            placeholder="Filter value"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                          />
                        </div>
                        <Button onClick={() => setIsAddingRecord(true)}>Add Record</Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {tables
                              .find((t) => t.name === selectedTable)
                              ?.columns.map((column) => (
                                <TableHead key={column.name}>
                                  <button
                                    className="flex items-center"
                                    onClick={() => {
                                      if (sortColumn === column.name) {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                                      } else {
                                        setSortColumn(column.name)
                                        setSortDirection("asc")
                                      }
                                    }}
                                  >
                                    {column.name}
                                    {sortColumn === column.name && <ArrowUpDown className="ml-2 h-4 w-4" />}
                                  </button>
                                </TableHead>
                              ))}
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRows.map((row, index) => (
                            <TableRow key={index}>
                              {tables
                                .find((t) => t.name === selectedTable)
                                ?.columns.map((column) => (
                                  <TableCell key={column.name}>{row[column.name]}</TableCell>
                                ))}
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="icon" onClick={() => setViewingRecord(row)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => setEditingRecord(row)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteRecord(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="structure">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Column Name</TableHead>
                          <TableHead>Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tables
                          .find((t) => t.name === selectedTable)
                          ?.columns.map((column) => (
                            <TableRow key={column.name}>
                              <TableCell>{column.name}</TableCell>
                              <TableCell>{column.type}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          )}
        </div>
      </div>

      {/* Add Record Dialog */}
      <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {tables
              .find((t) => t.name === selectedTable)
              ?.columns.map((column) => (
                <div key={column.name} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={column.name} className="text-right">
                    {column.name}
                  </Label>
                  <Input
                    id={column.name}
                    className="col-span-3"
                    value={newRecord[column.name] || ""}
                    onChange={(e) => setNewRecord({ ...newRecord, [column.name]: e.target.value })}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddingRecord(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddRecord}>Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editingRecord &&
              Object.entries(editingRecord).map(([key, value]) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={key} className="text-right">
                    {key}
                  </Label>
                  <Input
                    id={key}
                    className="col-span-3"
                    value={value}
                    onChange={(e) => setEditingRecord({ ...editingRecord, [key]: e.target.value })}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setEditingRecord(null)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleEditRecord(tables.find((t) => t.name === selectedTable)?.rows.indexOf(editingRecord!) || 0)
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Record Dialog */}
      <Dialog open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {viewingRecord &&
              Object.entries(viewingRecord).map(([key, value]) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-bold">{key}:</Label>
                  <span className="col-span-3">{value}</span>
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setViewingRecord(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Table Dialog */}
      <Dialog open={isAddingTable} onOpenChange={setIsAddingTable}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table-name" className="text-right">
                Table Name
              </Label>
              <Input
                id="table-name"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="column-name" className="text-right">
                Column Name
              </Label>
              <Input
                id="column-name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="col-span-2"
              />
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="date">Date</option>
              </select>
            </div>
            <Button onClick={handleAddColumn}>Add Column</Button>
            <div className="space-y-2">
              <h4 className="font-medium">Columns:</h4>
              {newTableColumns.map((column, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                    {column.name} ({column.type})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewTableColumns(newTableColumns.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddingTable(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleCreateTable} disabled={!newTableName || newTableColumns.length === 0}>
              Create Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

