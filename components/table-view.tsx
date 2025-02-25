"use client"

import { useState, useEffect } from "react"
import {
  Pencil,
  Trash2,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Upload,
  Eraser,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from "@/components/ui"

interface TableData {
  columns: string[]
  rows: Record<string, any>[]
}

const sampleData: Record<string, TableData> = {
  users: {
    columns: ["id", "name", "email", "role"],
    rows: [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    ],
  },
  products: {
    columns: ["id", "name", "price", "category"],
    rows: [
      { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
      { id: 2, name: "Desk Chair", price: 199.99, category: "Furniture" },
      { id: 3, name: "Coffee Maker", price: 79.99, category: "Appliances" },
    ],
  },
}

export function TableView({ tableName, projectId }: { tableName: string; projectId: string }) {
  const { toast } = useToast()
  const [data, setData] = useState<TableData>({ columns: [], rows: [] })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ column: "", direction: "" })
  const [filterColumn, setFilterColumn] = useState("")
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    // Load data from session storage if it exists
    const storedData = sessionStorage.getItem(`tableData_${projectId}_${tableName}`)
    if (storedData) {
      setData(JSON.parse(storedData))
    } else {
      // If no data in session storage, use sample data
      setData(sampleData[tableName] || { columns: [], rows: [] })
      sessionStorage.setItem(
        `tableData_${projectId}_${tableName}`,
        JSON.stringify(sampleData[tableName] || { columns: [], rows: [] }),
      )
    }
  }, [tableName, projectId])

  const saveData = (newData: TableData) => {
    setData(newData)
    sessionStorage.setItem(`tableData_${projectId}_${tableName}`, JSON.stringify(newData))
  }

  const handleDelete = (id: number) => {
    const newData = {
      ...data,
      rows: data.rows.filter((row) => row.id !== id),
    }
    saveData(newData)
    toast({
      title: "Row Deleted",
      description: `Successfully deleted row with ID ${id}`,
    })
  }

  const filteredRows = data.rows.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    )
    const matchesFilter =
      !filterColumn || !filterValue || row[filterColumn].toString().toLowerCase().includes(filterValue.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.column) return 0
    const aVal = a[sortConfig.column]
    const bVal = b[sortConfig.column]
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const handleAction = (action: string, rowId?: number) => {
    switch (action) {
      case "delete":
        if (rowId) handleDelete(rowId)
        break
      case "edit":
        toast({
          title: "Edit Row",
          description: `Editing row ${rowId}`,
        })
        break
      case "truncate":
        saveData({ ...data, rows: [] })
        toast({
          title: "Table Truncated",
          description: `Successfully truncated ${tableName}`,
        })
        break
      case "import":
        toast({
          title: "Import Started",
          description: "Importing data...",
        })
        break
      case "export":
        toast({
          title: "Export Started",
          description: "Exporting data...",
        })
        break
      default:
        toast({
          title: "Action Triggered",
          description: `${action} action on row ${rowId || ""}`,
        })
    }
  }

  const toggleSort = (column: string) => {
    setSortConfig((prevConfig) => ({
      column,
      direction: prevConfig.column === column && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  return (
    <div className="space-y-4">
      {/* Table Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Filter className="h-4 w-4" />
                {filterColumn && <div className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Filter by column</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={filterColumn} onValueChange={setFilterColumn}>
                    {data.columns.map((column) => (
                      <DropdownMenuRadioItem key={column} value={column}>
                        {column}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {filterColumn && (
                <div className="p-2">
                  <Input
                    placeholder="Filter value..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="h-8"
                  />
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={() => setSortConfig({ column: "", direction: "" })}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => handleAction("import")}>
            <Upload className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleAction("export")}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleAction("truncate")}>
            <Eraser className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Record</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {data.columns.map((column) => (
                  <div key={column} className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">{column}</Label>
                    <Input className="col-span-3" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">Save Record</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {data.columns.map((column) => (
                <TableHead key={column} className="cursor-pointer" onClick={() => toggleSort(column)}>
                  <div className="flex items-center gap-2">
                    {column}
                    {sortConfig.column === column && <ArrowUpDown className="h-4 w-4" />}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                {data.columns.map((column) => (
                  <TableCell key={`${row.id}-${column}`}>{row[column]}</TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction("edit", row.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleAction("delete", row.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Clone Record</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

