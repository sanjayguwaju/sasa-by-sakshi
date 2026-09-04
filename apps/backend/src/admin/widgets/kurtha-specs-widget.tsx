import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { Container, Heading, Text, Badge, Button, Input, Label, Select } from "@medusajs/ui"
import React, { useState } from "react"

const FABRIC_OPTIONS = [
  "Raw Silk / Banarasi Silk",
  "Pure Cotton / Malmal",
  "Georgette",
  "Chiffon",
  "Chanderi",
  "Velvet",
  "Organza",
  "Crepe",
  "Linen",
]

const STITCHING_OPTIONS = [
  "Ready-to-Wear (Stitched)",
  "Semi-Stitched",
  "Unstitched Fabric Set",
]

const SET_OPTIONS = [
  "3-Piece (Kurtha + Suruwal/Pant + Dupatta)",
  "2-Piece (Kurtha + Dupatta)",
  "2-Piece (Kurtha + Suruwal/Pant)",
  "Kurtha Top Only",
]

const KurthaSpecsWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const metadata = (data?.metadata || {}) as Record<string, string>

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form states initialized with existing metadata
  const [fabric, setFabric] = useState(metadata.fabric || "Pure Cotton / Malmal")
  const [stitchingType, setStitchingType] = useState(
    metadata.stitching_type || "Ready-to-Wear (Stitched)"
  )
  const [setIncludes, setSetIncludes] = useState(
    metadata.set_includes || "3-Piece (Kurtha + Suruwal/Pant + Dupatta)"
  )
  const [workEmbroidery, setWorkEmbroidery] = useState(
    metadata.work_embroidery || "Hand Block Print"
  )
  const [lengthInches, setLengthInches] = useState(
    metadata.length_inches || "44 inches"
  )
  const [careInstructions, setCareInstructions] = useState(
    metadata.care_instructions || "Dry Clean Recommended"
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const updatedMetadata = {
        ...metadata,
        fabric,
        stitching_type: stitchingType,
        set_includes: setIncludes,
        work_embroidery: workEmbroidery,
        length_inches: lengthInches,
        care_instructions: careInstructions,
        updated_at_boutique: new Date().toISOString(),
      }

      const res = await fetch(`/admin/products/${data.id}`, {
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
        throw new Error(errData.message || `Failed to update product specs (${res.status})`)
      }

      // Update data locally
      data.metadata = updatedMetadata
      setSuccessMessage("Kurtha specifications updated successfully!")
      setIsEditing(false)
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.")
    } finally {
      setIsSaving(false)
    }
  }

  const getBadgeColor = (type: string) => {
    if (type.includes("Ready-to-Wear")) return "green"
    if (type.includes("Semi-Stitched")) return "orange"
    return "blue"
  }

  return (
    <Container className="p-6 bg-white rounded-lg shadow-sm border border-ui-border-base my-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ui-border-base">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="kurtha">
            👗
          </span>
          <div>
            <Heading level="h2" className="text-lg font-semibold text-ui-fg-base">
              Kurtha Boutique Specifications
            </Heading>
            <Text className="text-sm text-ui-fg-subtle">
              Fabric, craftsmanship, stitching type, and boutique care attributes.
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
              Edit Specs
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Fabric / Material
            </Text>
            <Text className="text-sm font-semibold text-ui-fg-base">
              {fabric}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Stitching Type
            </Text>
            <div>
              <Badge color={getBadgeColor(stitchingType) as any}>
                {stitchingType}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Set Includes
            </Text>
            <Text className="text-sm font-semibold text-ui-fg-base">
              {setIncludes}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Work & Craftsmanship
            </Text>
            <Text className="text-sm font-semibold text-ui-fg-base">
              {workEmbroidery}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Kurtha Length
            </Text>
            <Text className="text-sm font-semibold text-ui-fg-base">
              {lengthInches}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-xs uppercase font-medium text-ui-fg-muted tracking-wider">
              Care Instructions
            </Text>
            <Text className="text-sm font-semibold text-ui-fg-base">
              {careInstructions}
            </Text>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSave} className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Fabric / Material
              </Label>
              <Select value={fabric} onValueChange={setFabric}>
                <Select.Trigger>
                  <Select.Value placeholder="Select fabric" />
                </Select.Trigger>
                <Select.Content>
                  {FABRIC_OPTIONS.map((opt) => (
                    <Select.Item key={opt} value={opt}>
                      {opt}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Stitching Type
              </Label>
              <Select value={stitchingType} onValueChange={setStitchingType}>
                <Select.Trigger>
                  <Select.Value placeholder="Select stitching type" />
                </Select.Trigger>
                <Select.Content>
                  {STITCHING_OPTIONS.map((opt) => (
                    <Select.Item key={opt} value={opt}>
                      {opt}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Set Includes
              </Label>
              <Select value={setIncludes} onValueChange={setSetIncludes}>
                <Select.Trigger>
                  <Select.Value placeholder="Select set pieces" />
                </Select.Trigger>
                <Select.Content>
                  {SET_OPTIONS.map((opt) => (
                    <Select.Item key={opt} value={opt}>
                      {opt}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Work & Craftsmanship
              </Label>
              <Input
                value={workEmbroidery}
                onChange={(e) => setWorkEmbroidery(e.target.value)}
                placeholder="e.g. Zari Embroidery, Hand Chikankari"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Kurtha Length / Flare
              </Label>
              <Input
                value={lengthInches}
                onChange={(e) => setLengthInches(e.target.value)}
                placeholder="e.g. 44 inches / Straight Cut"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-ui-fg-subtle">
                Care Instructions
              </Label>
              <Input
                value={careInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
                placeholder="e.g. Dry Clean Only, Gentle Cold Wash"
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
              Save Kurtha Specs
            </Button>
          </div>
        </form>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default KurthaSpecsWidget
