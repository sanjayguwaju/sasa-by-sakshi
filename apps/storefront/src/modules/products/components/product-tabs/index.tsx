"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="w-full flex flex-col border-t border-gray-200">
      {/* Tabs Header */}
      <div className="flex items-center justify-center gap-x-12 py-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("description")}
          className={`text-sm font-bold tracking-wider uppercase pb-2 border-b-2 ${
            activeTab === "description" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`text-sm font-bold tracking-wider uppercase pb-2 border-b-2 ${
            activeTab === "shipping" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Shipping & Return
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={`text-sm font-bold tracking-wider uppercase pb-2 border-b-2 ${
            activeTab === "custom" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Custom Tab
        </button>
      </div>

      {/* Tabs Content */}
      <div className="py-12">
        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "shipping" && <ShippingTab />}
        {activeTab === "custom" && <CustomTab />}
      </div>
    </div>
  )
}

const DescriptionTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="flex flex-col gap-y-12 animate-in fade-in duration-300">
      <p className="text-sm text-gray-700 leading-relaxed max-w-5xl">
        Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an ullamcorper mattis drostique des commodo pharetras loremos. Donec pretium egestas sapien et mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla in mi vel arcu convallis molestie et eget nulla. Donec laoreet daugue sit amet ornare rhoncus elit nisi luctus.
      </p>

      {/* Metropolis Image Mockup Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center mt-4">
        <div className="w-full md:w-1/2 aspect-video bg-gray-200 relative overflow-hidden flex items-end justify-center pb-8">
           {/* Placeholder for the two girls image */}
           <div className="absolute inset-0 bg-[#e8e6e5]"></div>
           <div className="z-10 bg-black/60 text-white text-xs px-3 py-1 rounded">Dinterdum pretium condimento example 1</div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center text-center px-12">
          <span className="text-sm text-gray-600 mb-2">New Collection</span>
          <h2 className="text-3xl font-bold tracking-widest mb-6 uppercase">#METROPOLIS</h2>
          <div className="w-8 h-[1px] bg-black mb-6"></div>
          <p className="text-sm text-gray-600 mb-8 max-w-sm">
            Nullam daliquet vestibulum augue non varius cras de cosmopolis congue melito duis tristique.
          </p>
          <button className="border border-black text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Shop the look
          </button>
        </div>
      </div>
    </div>
  )
}

const ShippingTab = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12 text-sm text-gray-700 leading-relaxed animate-in fade-in duration-300">
      <div className="flex-1">
        <h3 className="font-bold text-lg text-black mb-4">Sample Unordered List</h3>
        <ul className="list-disc pl-5 flex flex-col gap-y-2">
          <li>Comodous in tempor ullamcorper miaculis.</li>
          <li>Pellentesque vitae neque mollis urna mattis laoreet.</li>
          <li>Divamus sit amet purus justo.</li>
          <li>Proin molestie egestas orci ac suscipit risus posuere.</li>
        </ul>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-black mb-4">Sample Ordered List</h3>
        <ol className="list-decimal pl-5 flex flex-col gap-y-2">
          <li>Comodous in tempor ullamcorper miaculis.</li>
          <li>Pellentesque vitae neque mollis urna mattis laoreet.</li>
          <li>Divamus sit amet purus justo.</li>
          <li>Proin molestie egestas orci ac suscipit risus posuere loremous.</li>
        </ol>
      </div>
    </div>
  )
}

const CustomTab = () => {
  return (
    <div className="flex flex-col gap-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-y-4">
         <h3 className="font-bold text-lg text-black">Sample Block Quote</h3>
         <blockquote className="bg-gray-50 p-6 italic text-sm text-gray-600">
           Praesent vestibulum congue tellus at fringilla. Curabitur vitae semper sem, eu convallis est. Cras felis nunc commodo eu convallis vitae interdum non nisl. Maecenas ac est sit amet augue pharetra convallis, nec danos dui vestibulum sit amet auctor ipsum.
         </blockquote>
      </div>

      <div className="flex flex-col gap-y-4">
         <h3 className="font-bold text-lg text-black">Sample Paragraph Text</h3>
         <p className="text-sm text-gray-700 leading-relaxed">
           Praesent vestibulum congue tellus at fringilla. Curabitur vitae semper sem, eu convallis est. Cras felis nunc commodo eu convallis vitae interdum non nisl. Maecenas ac est sit amet augue pharetra convallis nec danos dui. Cras suscipit quam et turpis eleifend vitae malesuada magna congue. Damus id ullamcorper neque. Sed vitae mi a mi pretium aliquet ac sed elitos. Pellentesque nulla eros accumsan quis justo at tincidunt lobortis denimes, suspendisse vestibulum lectus in lectus volutpate.
         </p>
      </div>
    </div>
  )
}

export default ProductTabs
