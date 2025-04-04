import React, { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import type { Company } from '../types/types';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

function HidroReport() {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>({
    name: '',
    cnpj: '',
    image1_url: '',
    image2_url: '',
    measurements: []
  });
  const [images, setImages] = useState<{ preview1: string; preview2: string }>({
    preview1: '',
    preview2: ''
  });
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, imageNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);
    setImages(prev => ({
      ...prev,
      [`preview${imageNum}`]: preview
    }));

    try {
      setLoading(true);
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would upload the file to a storage service here
      const fakeUrl = `https://fake-url.com/image-${Date.now()}.jpg`;
      
      setCompany(prev => ({
        ...prev,
        [`image${imageNum}_url`]: fakeUrl
      }));
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company.name.trim() || !company.cnpj.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data (in a real app, this would be sent to an API)
      console.log('Form submitted:', company);
      
      toast.success('Form submitted successfully!');
      // Reset form
      setCompany({
        name: '',
        cnpj: '',
        image1_url: '',
        image2_url: '',
        measurements: []
      });
      setImages({ preview1: '', preview2: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-8 py-6 bg-orange-200 to-orange-700">
            <h1 className="text-3xl font-bold text-center">
              Teste Hidrostático
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Company Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Modelo do Equipamento de Teste
                </label>
                <input
                  type="text"
                  id="name"
                  value={company.name}
                  onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                  Número de série
                </label>
                <input
                  type="text"
                  id="cnpj"
                  value={company.cnpj}
                  onChange={(e) => setCompany(prev => ({ ...prev, cnpj: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((num) => (
                <div key={num} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image {num}
                  </label>
                  <div className="relative">
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                      {images[`preview${num}` as keyof typeof images] ? (
                        <div className="relative">
                          <Image
                            src={images[`preview${num}` as keyof typeof images]}
                            alt={`Preview ${num}`}
                            className="max-h-48 rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImages(prev => ({
                                ...prev,
                                [`preview${num}`]: ''
                              }));
                              setCompany(prev => ({
                                ...prev,
                                [`image${num}_url`]: ''
                              }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, num as 1 | 2)}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default HidroReport;