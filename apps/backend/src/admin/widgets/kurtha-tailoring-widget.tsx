import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"
import { Container, Heading, Text, Badge, Button, Input, Label, Select } from "@medusajs/ui"
import React, { useState } from "react"

const TAILORING_STATUSES = [
  "Not Required (Standard Size)",
  "Pending Customer Measurements",
  "Measurements Received / In Queue",
  "Fabric Cut & In Stitching",
  "Hand Finishing & Quality Checked",
  "Ready for Packaging & Dispatch",
]

const KurthaTailoringWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const metadata = (data?.metadata || {}) as Record<string, string>

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form states
  const [tailoringStatus, setTailoringStatus] = useState(
    metadata.tailoring_status || "Not Required (Standard Size)"
  )
  const [bust, setBust] = useState(metadata.measure_bust || "36 inches")
  const [waist, setWaist] = useState(metadata.measure_waist || "30 inches")
  const [hip, setHip] = useState(metadata.measure_hip || "40 inches")
  const [kurthaLength, setKurthaLength] = useState(metadata.measure_length || "44 inches")
  const [sleeveLength, setSleeveLength] = useState(metadata.measure_sleeve || "17 inches")
  const [bottomStyle, setBottomStyle] = useState(metadata.bottom_style || "Suruwal / Pant")
  const [tailorNotes, setTailorNotes] = useState(
    metadata.tailor_notes || "Standard cotton inner lining included."
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const updatedMetadata = {
        ...metadata,
        tailoring_status: tailoringStatus,
        measure_bust: bust,
        measure_waist: waist,
        measure_hip: hip,
        measure_length: kurthaLength,
        measure_sleeve: sleeveLength,
        bottom_style: bottomStyle,
        tailor_notes: tailorNotes,
        updated_at_tailor: new Date().toISOString(),
      }

      const res = await fetch(`/admin/orders/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          metadata: updatedMetadata,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message || `Failed to update order tailoring details (${res.status})`)
      }

      data.metadata = updatedMetadata
      setSuccessMessage("Tailoring measurements and status saved!")
      setIsEditing(false)
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.")
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    if (status.includes("Ready")) return "green"
    if (status.includes("Stitching") || status.includes("In Queue")) return "orange"
    if (status.includes("Pending")) return "red"
    return "grey"
  }

  return (
    <Container className="p-6 bg-white rounded-lg shadow-sm border border-ui-border-base my-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ui-border-base">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="tailor">
            🪡
          </span>
          <div>
            <Heading level="h2" className="text-lg font-semibold text-ui-fg-base">
              Boutique Tailoring & Stitching Card
            </Heading>
            <Text className="text-sm text-ui-fg-subtle">
              Manage custom Kurtha measurements, neckline/sleeve preferences, and tailor workflow.
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsEditing(true)}
            >
              Update Measurements
            </Button>
          ) : (
            <Button
              variant="transparent"
              size="small"
              onClick={() => {
                setIsEditing(false)
                setErrorMessage(null)
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mt-4 p-3 bg-ui-bg-highlight text-ui-fg-interactive rounded text-sm">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-3 bg-ui-bg-error-subtle text-ui-fg-error rounded text-sm">
          {errorMessage}
        </div>
      )}

      {/* View Mode */}
      {!isEditing ? (
        <div className="pt-5 space-y-6">
          <div className="flex items-center justify-between p-4 bg-ui-bg-subtle rounded-md border border-ui-border-base">
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
                Current Tailoring Workflow Status
              </Text>
              <Text className="text-base font-semibold text-ui-fg-base mt-0.5">
                {tailoringStatus}
              </Text>
            </div>
            <Badge color={getStatusColor(tailoringStatus) as any} size="large">
              {tailoringStatus.split("(")[0].trim()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-ui-bg-subtle/50 rounded-md border border-ui-border-base">
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Bust</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{bust}</Text>
            </div>
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Waist</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{waist}</Text>
            </div>
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Hip</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{hip}</Text>
            </div>
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Kurtha Length</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{kurthaLength}</Text>
            </div>
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Sleeve Length</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{sleeveLength}</Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Bottom / Pant Style</Text>
              <Text className="text-sm font-semibold text-ui-fg-base mt-1">{bottomStyle}</Text>
            </div>
            <div>
              <Text className="text-xs uppercase font-medium text-ui-fg-muted">Tailor Notes & Customizations</Text>
              <Text className="text-sm text-ui-fg-base mt-1 bg-ui-bg-subtle/50 p-2.5 rounded border border-ui-border-base">
                {tailorNotes}
              </Text>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSave} className="pt-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-ui-fg-subtle">
              Tailoring Workflow Status
            </Label>
            <Select value={tailoringStatus} onValueChange={setTailoringStatus}>
              <Select.Trigger>
                <Select.Value placeholder="Select status" />
              </Select.Trigger>
              <Select.Content>
                {TAILORING_STATUSES.map((status) => (
                  <Select.Item key={status} value={status}>
                    {status}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Bust</Label>
              <Input value={bust} onChange={(e) => setBust(e.target.value)} placeholder="36 in" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Waist</Label>
              <Input value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="30 in" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Hip</Label>
              <Input value={hip} onChange={(e) => setHip(e.target.value)} placeholder="40 in" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Length</Label>
              <Input value={kurthaLength} onChange={(e) => setKurthaLength(e.target.value)} placeholder="44 in" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Sleeve</Label>
              <Input value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} placeholder="17 in" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Bottom / Pant Style</Label>
              <Input
                value={bottomStyle}
                onChange={(e) => setBottomStyle(e.target.value)}
                placeholder="e.g. Palazzo, Cigarette Pant, Salwar"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">Tailor Notes & Custom Instructions</Label>
              <Input
                value={tailorNotes}
                onChange={(e) => setTailorNotes(e.target.value)}
                placeholder="e.g. Boat neck, cotton lining in sleeves, deep back with dori"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-ui-border-base">
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="small"
              isLoading={isSaving}
            >
              Save Tailoring Details
            </Button>
          </div>
        </form>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default KurthaTailoringWidget
