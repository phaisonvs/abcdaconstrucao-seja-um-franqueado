document.addEventListener("DOMContentLoaded", function () {
  const elementos = {
    botaoProximaEtapa1: document.getElementById("botaoProximaEtapaStep1"),
    botaoVoltar: document.getElementById("botaoVoltarStep2"),
    botaoProximaEtapa2: document.getElementById("botaoProximaEtapaStep2"),
    botaoVoltarStep3: document.getElementById("botaoVoltarStep3"),
    botaoProximaEtapa3: document.getElementById("botaoProximaEtapaStep3"),
    progressBar: document.getElementById("progress-bar"),
    progressPercent: document.getElementById("progress-percent"),
    titleStep1: document.getElementById("titleStep1"),
    formStep1: document.getElementById("formStep1"),
    titleStep2: document.getElementById("titleStep2"),
    formStep2: document.getElementById("formStep2"),
    titleStep3: document.getElementById("titleStep3"),
    formStep3: document.getElementById("formStep3"),
    nome: document.getElementById("name"),
    email: document.getElementById("email"),
    tel: document.getElementById("tel"),
    stateSelect: document.getElementById("state"),
    citySelect: document.getElementById("city"),
    privacyPolicyCheckbox: document.getElementById("privacyPolicy"),
    botaoEnviar: document.getElementById("botaoEnviar"),
    titleStep4: document.getElementById("titleStep4"),
    formStep4: document.getElementById("formStep4"),
    professionSelect: document.getElementById("profession"),
  };

  elementos.botaoProximaEtapa1.disabled = true;
  elementos.botaoProximaEtapa1.classList.add("disabled");
  elementos.botaoProximaEtapa2.disabled = true;
  elementos.botaoProximaEtapa2.classList.add("disabled");
  elementos.botaoEnviar.disabled = true;
  elementos.botaoEnviar.classList.add("disabled");

  elementos.progressBar.style.width = "0%";
  elementos.progressPercent.textContent = "0%";

  configurarEventos();

  function configurarEventos() {
    verificarCamposStep1();
    verificarCamposStep2();
    verificarCamposStep3();
    atualizarProgresso();

    elementos.botaoProximaEtapa1.addEventListener("click", () => {
      trocarEtapa(
        elementos.titleStep1,
        elementos.formStep1,
        elementos.titleStep2,
        elementos.formStep2
      );
      atualizarProgresso();
    });

    elementos.botaoVoltar.addEventListener("click", () => {
      trocarEtapa(
        elementos.titleStep2,
        elementos.formStep2,
        elementos.titleStep1,
        elementos.formStep1
      );
      atualizarProgresso();
    });

    elementos.botaoProximaEtapa2.addEventListener("click", () => {
      trocarEtapa(
        elementos.titleStep2,
        elementos.formStep2,
        elementos.titleStep3,
        elementos.formStep3
      );
      atualizarProgresso();
    });

    elementos.botaoVoltarStep3.addEventListener("click", () => {
      trocarEtapa(
        elementos.titleStep3,
        elementos.formStep3,
        elementos.titleStep2,
        elementos.formStep2
      );
      atualizarProgresso();
    });

    elementos.nome.addEventListener("input", () => {
      validarNome();
      verificarCamposStep2();
      atualizarProgresso();
    });
    elementos.tel.addEventListener("input", () => {
      elementos.tel.value = elementos.tel.value.replace(/\D/g, "");
      formatarTelefone();
      validarTelefone();
      verificarCamposStep2();
      atualizarProgresso();
    });

    elementos.email.addEventListener("input", () => {
      formatarEmail();
      validarEmail();
      verificarCamposStep2();
      atualizarProgresso();
    });

    elementos.professionSelect.addEventListener("change", () => {
      verificarCamposStep2();
      atualizarProgresso();
    });

    elementos.stateSelect.addEventListener("change", () => {
      verificarCamposStep3();
      atualizarProgresso();
    });
    elementos.citySelect.addEventListener("change", () => {
      verificarCamposStep3();
      atualizarProgresso();
    });
    elementos.privacyPolicyCheckbox.addEventListener("change", () => {
      verificarCamposStep3();
      atualizarProgresso();
    });

    document.querySelectorAll(".botao-investimento").forEach((botao) => {
      botao.addEventListener("click", () => {
        alternarSelecao(botao);
        verificarCamposStep1();
        atualizarProgresso();
      });
    });

    elementos.botaoEnviar.addEventListener("click", (event) => {
      event.preventDefault();
      trocarEtapa(
        elementos.titleStep3,
        elementos.formStep3,
        elementos.titleStep4,
        elementos.formStep4
      );
      animarProgresso(parseInt(elementos.progressBar.style.width), 100, true);
    });

    const botaoReset = document.getElementById("botaoReset");
    botaoReset.addEventListener("click", () => {
      trocarEtapa(
        elementos.titleStep4,
        elementos.formStep4,
        elementos.titleStep1,
        elementos.formStep1,
        () => {
          document.querySelectorAll("form").forEach((form) => form.reset());

          document
            .querySelectorAll(".botao-investimento.selected")
            .forEach((botao) => {
              botao.classList.remove("selected");
            });

          elementos.botaoProximaEtapa1.disabled = true;
          elementos.botaoProximaEtapa1.classList.remove("selected");
          elementos.botaoProximaEtapa1.classList.add("disabled");

          elementos.botaoProximaEtapa2.disabled = true;
          elementos.botaoProximaEtapa2.classList.remove("selected");
          elementos.botaoProximaEtapa2.classList.add("disabled");

          elementos.botaoEnviar.disabled = true;
          elementos.botaoEnviar.classList.remove("selected");
          elementos.botaoEnviar.classList.add("disabled");

          elementos.progressBar.style.width = "0%";
          elementos.progressPercent.textContent = "0%";
          elementos.progressBar.style.backgroundColor = "";

          elementos.email.setCustomValidity("");

          verificarCamposStep1();
          verificarCamposStep2();
          verificarCamposStep3();
          atualizarProgresso();
        }
      );
    });
  }

  function alternarSelecao(botaoClicado) {
    const selecionado = botaoClicado.classList.contains("selected");
    document
      .querySelectorAll(".botao-investimento.selected")
      .forEach((botao) => botao.classList.remove("selected"));
    if (!selecionado) botaoClicado.classList.add("selected");
  }

  function verificarCamposStep1() {
    const botaoSelecionado = document.querySelector(
      ".botao-investimento.selected"
    );
    elementos.botaoProximaEtapa1.disabled = !botaoSelecionado;
    elementos.botaoProximaEtapa1.classList.toggle(
      "selected",
      !!botaoSelecionado
    );
    elementos.botaoProximaEtapa1.classList.toggle(
      "disabled",
      !botaoSelecionado
    );
  }

  function verificarCamposStep2() {
    const campos = document.querySelectorAll(
      "#formStep2 input[required], #formStep2 select[required]"
    );
    let todosPreenchidos = true;

    campos.forEach((campo) => {
      if (campo.value.trim() === "" || !campo.checkValidity()) {
        todosPreenchidos = false;
      }
    });

    elementos.botaoProximaEtapa2.disabled = !todosPreenchidos;
    elementos.botaoProximaEtapa2.classList.toggle("selected", todosPreenchidos);
    elementos.botaoProximaEtapa2.classList.toggle(
      "disabled",
      !todosPreenchidos
    );
  }

  function verificarCamposStep3() {
    const estadoSelecionado = elementos.stateSelect.value !== "";
    const cidadeSelecionada = elementos.citySelect.value !== "";
    const privacyPolicyAceita = elementos.privacyPolicyCheckbox.checked;

    const todosPreenchidos =
      estadoSelecionado && cidadeSelecionada && privacyPolicyAceita;

    elementos.botaoEnviar.disabled = !todosPreenchidos;
    elementos.botaoEnviar.classList.toggle("selected", todosPreenchidos);
    elementos.botaoEnviar.classList.toggle("disabled", !todosPreenchidos);
  }

  function trocarEtapa(hideTitle, hideForm, showTitle, showForm, callback) {
    const container = document.querySelector(".forms");

    const initialHeight = container.offsetHeight;

    [showTitle, showForm].forEach((el) => (el.style.display = ""));
    [hideTitle, hideForm].forEach((el) => (el.style.display = "none"));

    container.offsetHeight;

    const finalHeight = container.offsetHeight;

    container.style.height = initialHeight + "px";
    container.offsetHeight;
    container.style.height = finalHeight + "px";

    container.addEventListener("transitionend", function handler() {
      container.style.height = "";
      container.removeEventListener("transitionend", handler);

      if (typeof callback === "function") {
        callback();
      }
    });
  }

  const codigosDDDValidos = [
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19, // SP
    21,
    22,
    24, // RJ
    27,
    28, // ES
    31,
    32,
    33,
    34,
    35,
    37,
    38, // MG
    41,
    42,
    43,
    44,
    45,
    46, // PR
    47,
    48,
    49, // SC
    51,
    53,
    54,
    55, // RS
    61, // DF
    62,
    64, // GO
    63, // TO
    65,
    66, // MT
    67, // MS
    68, // AC
    69, // RO
    71,
    73,
    74,
    75,
    77, // BA
    79, // SE
    81,
    87, // PE
    82, // AL
    83, // PB
    84, // RN
    85,
    88, // CE
    86,
    89, // PI
    91,
    93,
    94, // PA
    92,
    97, // AM
    95, // RR
    96, // AP
    98,
    99, // MA
  ];

  function formatarTelefone() {
    let valor = elementos.tel.value.replace(/\D/g, "");

    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }

    if (valor.length <= 2) {
      elementos.tel.value = `(${valor}`;
    } else if (valor.length > 2 && valor.length <= 3) {
      elementos.tel.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 3 && valor.length <= 7) {
      elementos.tel.value = `(${valor.slice(0, 2)}) ${valor.slice(
        2,
        3
      )} ${valor.slice(3)}`;
    } else if (valor.length > 7 && valor.length <= 11) {
      elementos.tel.value = `(${valor.slice(0, 2)}) ${valor.slice(
        2,
        3
      )} ${valor.slice(3, 7)}-${valor.slice(7)}`;
    }
  }

  function validarTelefone() {
    const telefone = elementos.tel.value.replace(/\D/g, "");
    let mensagemErro = "";

    if (!telefone) {
      mensagemErro = "O número de telefone é obrigatório.";
    } else if (telefone.length !== 11) {
      mensagemErro =
        "O número de telefone deve ter exatamente 11 dígitos (DDD + nono dígito + número).";
    } else if (/^0+$/.test(telefone)) {
      mensagemErro = "O número de telefone não pode conter apenas zeros.";
    } else {
      const ddd = parseInt(telefone.slice(0, 2), 10);
      if (!codigosDDDValidos.includes(ddd)) {
        mensagemErro = `O DDD ${ddd} não é válido.`;
      } else if (telefone[2] !== "9") {
        mensagemErro = "O número de celular deve começar com 9 após o DDD.";
      }
    }

    if (mensagemErro) {
      elementos.tel.setCustomValidity(mensagemErro);
      elementos.tel.classList.add("input-error");
      elementos.tel.title = mensagemErro;
    } else {
      elementos.tel.setCustomValidity("");
      elementos.tel.classList.remove("input-error");
      elementos.tel.title = "";
    }
  }

  function formatarEmail() {
    elementos.email.value = elementos.email.value.toLowerCase();
  }

  function validarEmail() {
    const validEmail = /^[a-z0-9._-]+@[a-z0-9.-]+\.(com|com\.br)$/;
    const isValid = validEmail.test(elementos.email.value);
    const mensagemErro = !isValid
      ? "Por favor, insira um endereço de e-mail válido com a terminação .com ou .com.br."
      : "";

    if (mensagemErro) {
      elementos.email.setCustomValidity(mensagemErro);
      elementos.email.classList.add("input-error");
      elementos.email.title = mensagemErro;
    } else {
      elementos.email.setCustomValidity("");
      elementos.email.classList.remove("input-error");
      elementos.email.title = "";
    }
  }

  function validarNome() {
    elementos.nome.value = elementos.nome.value
      .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
      .toUpperCase();
  }

  function atualizarProgresso() {
    let progresso = 0;

    const botaoSelecionado = document.querySelector(
      ".botao-investimento.selected"
    );
    if (botaoSelecionado) {
      progresso = 80;
    }

    const camposStep2 = document.querySelectorAll(
      "#formStep2 input[required], #formStep2 select[required]"
    );
    const todosPreenchidosStep2 = Array.from(camposStep2).every(
      (campo) => campo.value.trim() !== "" && campo.checkValidity()
    );

    if (todosPreenchidosStep2) {
      progresso = 90;
    }

    const estadoSelecionado = elementos.stateSelect.value !== "";
    const cidadeSelecionada = elementos.citySelect.value !== "";
    const privacyPolicyAceita = elementos.privacyPolicyCheckbox.checked;

    const todosPreenchidosStep3 =
      estadoSelecionado && cidadeSelecionada && privacyPolicyAceita;
    if (todosPreenchidosStep3) {
      progresso = 99;
    }

    const isOnFinalStep =
      window.getComputedStyle(elementos.formStep4).display !== "none";
    if (isOnFinalStep) {
      progresso = 100;
    }

    const progressoAtual = parseInt(elementos.progressBar.style.width) || 0;
    if (progressoAtual !== progresso) {
      animarProgresso(progressoAtual, progresso, progresso === 100);
    }
  }

  function animarProgresso(inicio, fim, isFinalStep = false) {
    let progressoAtual = inicio;
    const incremento = fim > inicio ? 1 : -1;

    const intervalo = setInterval(() => {
      progressoAtual += incremento;

      if (
        (incremento > 0 && progressoAtual >= fim) ||
        (incremento < 0 && progressoAtual <= fim)
      ) {
        progressoAtual = fim;
        clearInterval(intervalo);

        if (isFinalStep) {
          elementos.progressBar.style.backgroundColor = "#0FA848";
        } else {
          elementos.progressBar.style.backgroundColor = "";
        }
      }

      elementos.progressBar.style.width = `${progressoAtual}%`;
      elementos.progressPercent.textContent = `${progressoAtual}%`;
    }, 10);
  }

  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  // Evento: Quando um estado é selecionado
  stateSelect.addEventListener("change", () => {
    const stateId = stateSelect.value; // ID do estado selecionado
    console.log(`Estado selecionado: ${stateId}`); // Log do estado selecionado
    fetchCitiesByState(stateId); // Chamar função para buscar cidades
  });

  // Função para buscar cidades do estado selecionado
  async function fetchCitiesByState(stateId) {
    console.log(`Buscando cidades para o estado ID: ${stateId}`); // Log antes da requisição
    try {
      // URL da API do IBGE com filtro para distritos do estado selecionado
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
      );

      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} - ${response.statusText}`
        );
      }

      const cities = await response.json(); // Converter para JSON
      console.log(`Cidades recebidas:`, cities); // Log das cidades recebidas

      // Limpar o select de cidades antes de preencher
      citySelect.innerHTML =
        '<option value="" disabled selected>Selecione a cidade</option>';

      // Preencher o select de cidades com os dados retornados
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.id; // Você pode mudar para city.nome se preferir
        option.textContent = city.nome;
        citySelect.appendChild(option);
      });

      console.log("Select de cidades atualizado com sucesso."); // Log de sucesso
    } catch (error) {
      console.error("Erro ao buscar cidades:", error); // Log detalhado do erro
      alert("Não foi possível carregar as cidades. Tente novamente.");
    }
  }
});
