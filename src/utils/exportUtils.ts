import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { IDonation, Category } from '@/core/donation/model/IDonation';

// Função para formatar categoria para exibição
const formatCategory = (category: Category): string => {
   const categoryMap: Record<Category, string> = {
      [Category.VESTIMENTA]: 'Vestimenta',
      [Category.ALIMENTO]: 'Alimento',
      [Category.BRINQUEDO]: 'Brinquedo',
      [Category.HIGIENE]: 'Higiene',
      [Category.ELETRONICO]: 'Eletrônico',
      [Category.LIVRO]: 'Livro',
      [Category.OUTRO]: 'Outro',
   };
   return categoryMap[category] || category;
};

// Função para formatar data
const formatDate = (date: Date | null): string => {
   if (!date) return '';
   return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
};

// Exportar para PDF
export const exportToPDF = (
   donations: IDonation[],
   filename: string = 'doacoes.pdf'
) => {
   const doc = new jsPDF();

   // Configurações do documento
   const pageWidth = doc.internal.pageSize.getWidth();
   const margin = 20;
   const tableStartY = 60;
   let currentY = tableStartY;

   // Título
   doc.setFontSize(20);
   doc.setFont('helvetica', 'bold');
   doc.text('Relatório de Doações', pageWidth / 2, 30, { align: 'center' });

   // Data de geração
   doc.setFontSize(10);
   doc.setFont('helvetica', 'normal');
   doc.text(
      `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
      pageWidth / 2,
      45,
      { align: 'center' }
   );

   // Cabeçalho da tabela
   doc.setFontSize(12);
   doc.setFont('helvetica', 'bold');

   const headers = [
      'Nome',
      'Categoria',
      'Doador',
      'Qtd. Atual',
      'Data Cadastro',
   ];
   const colWidths = [40, 35, 40, 25, 35];
   let currentX = margin;

   // Desenhar cabeçalho
   headers.forEach((header, index) => {
      doc.rect(currentX, currentY - 5, colWidths[index], 10);
      doc.text(header, currentX + 2, currentY + 2);
      currentX += colWidths[index];
   });

   currentY += 10;

   // Dados da tabela
   doc.setFont('helvetica', 'normal');
   doc.setFontSize(9);

   donations.forEach((donation, index) => {
      // Verificar se precisa de nova página
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
         doc.addPage();
         currentY = 20;
      }

      currentX = margin;
      const rowData = [
         donation.name,
         formatCategory(donation.category),
         donation.donator_name || '',
         donation.current_quantity?.toString() || '0',
         formatDate(donation.created_at),
      ];

      rowData.forEach((data, colIndex) => {
         doc.rect(currentX, currentY - 5, colWidths[colIndex], 8);
         // Truncar texto se muito longo
         const truncatedData =
            data.length > 20 ? data.substring(0, 17) + '...' : data;
         doc.text(truncatedData, currentX + 1, currentY + 2);
         currentX += colWidths[colIndex];
      });

      currentY += 8;
   });

   // Salvar o arquivo
   doc.save(filename);
};

// Exportar para Excel
export const exportToExcel = (
   donations: IDonation[],
   filename: string = 'doacoes.xlsx'
) => {
   // Preparar dados para Excel
   const excelData = donations.map((donation) => ({
      Nome: donation.name,
      Categoria: formatCategory(donation.category),
      Descrição: donation.description,
      Doador: donation.donator_name || '',
      'Quantidade Inicial': donation.initial_quantity,
      'Quantidade Atual': donation.current_quantity || 0,
      Disponível: donation.available ? 'Sim' : 'Não',
      Gênero: donation.gender || '',
      Tamanho: donation.size || '',
      'Data de Cadastro': formatDate(donation.created_at),
      Ativo: donation.active ? 'Sim' : 'Não',
   }));

   // Criar workbook e worksheet
   const wb = XLSX.utils.book_new();
   const ws = XLSX.utils.json_to_sheet(excelData);

   // Ajustar largura das colunas
   const colWidths = [
      { wch: 20 }, // Nome
      { wch: 15 }, // Categoria
      { wch: 30 }, // Descrição
      { wch: 20 }, // Doador
      { wch: 15 }, // Qtd. Inicial
      { wch: 15 }, // Qtd. Atual
      { wch: 10 }, // Disponível
      { wch: 10 }, // Gênero
      { wch: 10 }, // Tamanho
      { wch: 20 }, // Data Cadastro
      { wch: 10 }, // Ativo
   ];
   ws['!cols'] = colWidths;

   // Adicionar worksheet ao workbook
   XLSX.utils.book_append_sheet(wb, ws, 'Doações');

   // Salvar arquivo
   XLSX.writeFile(wb, filename);
};

// Função para gerar nome do arquivo com timestamp
export const generateFilename = (
   type: 'pdf' | 'xlsx',
   prefix: string = 'doacoes'
): string => {
   const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
   return `${prefix}_${timestamp}.${type}`;
};
