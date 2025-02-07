export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-blue-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-[#4AA1D3] mb-6">
          Página não encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Não foi possível encontrar o recurso solicitado.
        </p>
        <p className="text-lg text-[#090934] mb-6">
          Por favor, volte para a{" "}
          <a
            href="/"
            className="text-[#387AA1] underline hover:text-[#285D7E] transition-colors"
          >
            página inicial
          </a>
          .
        </p>
        <div className="text-[#4AA1D3] text-6xl mb-4">
          <i className="fas fa-exclamation-circle"></i>
        </div>
      </div>
    </div>
  );
}
