import LayoutAdmin from '../../../components/admin-layout'
import React, { useState } from 'react'

const ServicePage = () => {
  // Sample clinic data
  const clinics = [
    { id: 1, name: 'Clinic A', services: ['Checkup', 'Vaccination', 'Surgery'] },
    { id: 2, name: 'Clinic B', services: ['Consultation', 'Physiotherapy', 'Lab Tests'] },
    { id: 3, name: 'Clinic C', services: ['Emergency', 'Orthopedics', 'Dental'] },
  ]

  const [selectedClinic, setSelectedClinic] = useState<null | { name: string; services: string[] }>(null)

  const handleClick = (clinic: { name: string; services: string[] }) => {
    setSelectedClinic(clinic)
  }

  return (
    <LayoutAdmin>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Clinics List</h1>
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold text-gray-700">{clinic.name}</h2>
              <button
                onClick={() => handleClick(clinic)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedClinic && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Services for {selectedClinic.name}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-lg text-gray-600">
              {selectedClinic.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default ServicePage
