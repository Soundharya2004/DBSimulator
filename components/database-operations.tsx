"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function DatabaseOperations() {
  const { toast } = useToast()
  const [queryResult, setQueryResult] = useState<any[] | null>(null)
  const [customQuery, setCustomQuery] = useState("")

  const handleOperation = (operation: string) => {
    toast({
      title: "Operation Executed",
      description: `Successfully executed ${operation}`,
    })
    // Simulate query result
    setQueryResult([
      { id: 1, name: "Sample Data 1" },
      { id: 2, name: "Sample Data 2" },
    ])
  }

  const executeCustomQuery = () => {
    if (!customQuery.trim()) return
    toast({
      title: "Query Executed",
      description: "Successfully executed custom query",
    })
    setCustomQuery("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Database Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* DDL Commands */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">DDL Commands</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700">CREATE TABLE</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Table</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <Input placeholder="Table Name" />
                    <Textarea placeholder="Column Definitions" />
                    <Button
                      onClick={() => handleOperation("CREATE TABLE")}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Create
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("ALTER TABLE")}>
                ALTER TABLE
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("DROP TABLE")}>
                DROP TABLE
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("TRUNCATE")}>
                TRUNCATE
              </Button>
            </div>

            {/* DML Commands */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">DML Commands</h3>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("SELECT")}>
                SELECT
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("INSERT")}>
                INSERT
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("UPDATE")}>
                UPDATE
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("DELETE")}>
                DELETE
              </Button>
            </div>

            {/* Clauses */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Clauses</h3>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("WHERE")}>
                WHERE
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("GROUP BY")}>
                GROUP BY
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("ORDER BY")}>
                ORDER BY
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("HAVING")}>
                HAVING
              </Button>
            </div>

            {/* Joins */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Joins</h3>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("INNER JOIN")}>
                INNER JOIN
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("LEFT JOIN")}>
                LEFT JOIN
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("RIGHT JOIN")}>
                RIGHT JOIN
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleOperation("FULL JOIN")}>
                FULL JOIN
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Custom Query</h3>
            <div className="flex gap-2">
              <Textarea
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Enter your SQL query here..."
                className="flex-1"
              />
              <Button onClick={executeCustomQuery} className="bg-green-600 hover:bg-green-700">
                Execute
              </Button>
            </div>
          </div>

          {queryResult && (
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Query Result</h3>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(queryResult[0]).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResult.map((row, i) => (
                      <TableRow key={i}>
                        {Object.values(row).map((value, j) => (
                          <TableCell key={j}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

