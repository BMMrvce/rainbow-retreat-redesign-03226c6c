import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  handled?: boolean | null;
};

export default function ContactRequests() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRows = async () => {
    setLoading(true);
    try {
      // cast to any to avoid strict DB typings here (don't modify DB types)
      const res = (await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })) as any;
      setRows(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHandled = async (id: string, current?: boolean | null) => {
    const newVal = !Boolean(current);
    // optimistic UI update
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, handled: newVal } : r)));

    try {
      const res = (await supabase
        .from("contact_submissions")
        .update({ handled: newVal })
        .eq("id", id)) as any;

      if (res.error) throw res.error;
    } catch (err) {
      // revert on error
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, handled: current ?? false } : r)));
      // minimal feedback — keep dependencies minimal instead of using toasts
      // user can improve with existing toast hook if desired
      // eslint-disable-next-line no-alert
      alert("Failed to update request. Please try again.");
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Contact Requests</h1>
          <div>
            <Button size="sm" onClick={fetchRows} className="mr-2">
              Refresh
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setRows([])}>
              Clear (UI only)
            </Button>
          </div>
        </div>

        <div className="shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Handled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>No contact requests found.</TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell className="max-w-xl truncate">{r.message}</TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
                    <TableCell>{r.handled ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => toggleHandled(r.id, r.handled)}>
                          {r.handled ? "Mark Not Done" : "Mark Done"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
