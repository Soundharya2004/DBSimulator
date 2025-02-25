"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, MoreHorizontal, Plus, Search, SortAsc, Trash } from "lucide-react"
import { sampleTableData } from "@/lib/sample-data"

export function DatabaseTable() {
  const [data, setData] = useState(sampleTableData)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (id: number) => {
    setData({
      ...data,
      rows: data.rows.filter((row) => row.id !== id),
    })
  }

  const filteredRows = data.rows.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {data.columns.map((column) => (
                <TableHead key={column.id}>{column.name}</TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                {data.columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>{row[column.id as keyof typeof row]}</TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDelete(row.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

