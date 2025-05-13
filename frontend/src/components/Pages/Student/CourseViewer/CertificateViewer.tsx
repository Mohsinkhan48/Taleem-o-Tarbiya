import React, { useEffect, useState } from "react";
import { BiErrorCircle, BiInfoCircle } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa6";
import apiClient from "../../../../api/apiClient";
import { BACKEND_URL, SERVER_URL } from "../../../../constants/env.constants";
import { Loader } from "../../../../assets/Loader";

interface CertificateResponse {
  certificateUrl?: string;
  isCertificate: boolean;
}

interface CertificateViewerProps {
  courseId: string;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ courseId }) => {
  const [loading, setLoading] = useState(true);
  const [certificateData, setCertificateData] = useState<CertificateResponse | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await apiClient.get(`${SERVER_URL}course/get-certificate/${courseId}`);
        setCertificateData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An error occurred while fetching certificate."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-info">
        <Loader className="text-3xl" />
        <span className="ml-2">Loading certificate...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-error font-medium p-4 rounded bg-error/10">
        <BiErrorCircle className="text-2xl mr-2" />
        {error}
      </div>
    );
  }

  if (certificateData && !certificateData.isCertificate) {
    return (
      <div className="flex items-center text-warning font-medium p-4 rounded bg-warning/10">
        <BiInfoCircle className="text-2xl mr-2" />
        You need to complete the course to get a certificate.
      </div>
    );
  }

  if (certificateData?.certificateUrl) {
    return (
      <div className="flex flex-col items-center text-text">
        <div className="flex items-center text-primary mb-4 text-2xl font-semibold">
          <FaCertificate className="mr-2" />
          Your Certificate
        </div>
        <div className="w-full max-w-4xl border border-card-border rounded-md shadow-xl overflow-hidden">
          <iframe
            src={`${BACKEND_URL}${certificateData.certificateUrl}`}
            title="Certificate"
            className="w-full h-[600px] bg-white"
          ></iframe>
        </div>
      </div>
    );
  }

  return null;
};

export default CertificateViewer;
