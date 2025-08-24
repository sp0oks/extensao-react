import { useState } from 'react';
import Papa from 'papaparse';
import apiClient from '../../api/apiClient';
import Button from '../../components/Button';
import ProductCard from './ProductCard';
import '../../styles/ProductCSVUploader.css';

export default function ProductCSVUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [parsedProducts, setParsedProducts] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            setFile(null);
            setParsedProducts([]);
            return;
        }

        if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
            alert('Extensão de arquivo inválida');
            setInputKey(Date.now());
            setFile(null);
            setParsedProducts([]);
            return;
        }

        setSubmissionStatus({});

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const productsWithSelection = results.data.map((product, index) => {
                    const tempId = `csv-${index}`;
                    return {
                        name: product.name ? String(product.name).substring(0, 512) : '',
                        description: product.description ? String(product.description).substring(0, 1024) : '',
                        price: parseFloat(product.price) || 0,
                        category: product.category ? String(product.category) : '',
                        pictureUrl: product.pictureUrl ? String(product.pictureUrl).substring(0, 512) : '',
                        id: tempId,
                        code: tempId,
                        isSelected: false,
                    }
                });
                setFile(selectedFile);
                setParsedProducts(productsWithSelection);
            },
        });
    };

    const handleProductSelect = (productId) => {
        setParsedProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, isSelected: !p.isSelected } : p
            )
        );
    };

    const handleUpload = async () => {
        const productsToUpload = parsedProducts.filter(p => p.isSelected);
        if (productsToUpload.length === 0) {
            alert('Selecione ao menos um produto para enviar.');
            return;
        }

        setIsSubmitting(true);
        const newStatus = {};

        const uploadPromises = productsToUpload.map(product =>
            apiClient.post('/produtos', product)
                .then(response => {
                    newStatus[product.id] = { success: true, message: 'Criado com sucesso!' };
                    return response.data;
                })
                .catch(error => {
                    const message = error.response?.data?.error || 'Falha ao criar.';
                    newStatus[product.id] = { success: false, message: `Falha: ${message}` };
                    return null;
                })
        );
        
        const results = await Promise.all(uploadPromises);

        setSubmissionStatus(newStatus);
        setIsSubmitting(false);

        const successfullyCreatedProducts = results.filter(result => result !== null);
        if (successfullyCreatedProducts.length > 0) {
            onUploadSuccess(successfullyCreatedProducts);
        }
    };

    const isButtonDisabled = !file || parsedProducts.length === 0 || isSubmitting;

    return (
        <div className="csv-uploader-container">
            <div className="uploader-controls">
                <label htmlFor="csv-input">Arquivo CSV</label>
                <div className="csv-input-group">
                    <input key={inputKey} id="csv-input" type="file" accept=".csv" onChange={handleFileChange} />
                </div>
                <Button
                    text="Enviar"
                    action={handleUpload}
                    disabled={isButtonDisabled}
                />
            </div>

            {parsedProducts.length > 0 && (
                <div className="csv-preview">
                    <h4>Pré-visualização do Arquivo</h4>
                    <div className="product-deck-container">
                        {parsedProducts.map(product => (
                            <div key={product.id} className="preview-item">
                                <ProductCard
                                    product={product}
                                    mode="preview"
                                    isSelected={product.isSelected}
                                    onSelect={handleProductSelect}
                                />
                                {submissionStatus[product.id] && (
                                    <div className={`status-message ${submissionStatus[product.id].success ? 'success' : 'error'}`}>
                                        {submissionStatus[product.id].message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}