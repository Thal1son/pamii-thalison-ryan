import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

interface BotaoProps {
  titulo: string;
  corFundo?: string;
  corTexto?: string;
}

export default function Index() {
  const [expressao, setExpressao] = useState<string>('');
  const [resultado, setResultado] = useState<string>('0');

  const operadores = ['+', '-', 'x', '÷', '+/-'];

  const linhasDeBotoes = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '=']
  ];

  const obterCorFundo = (botao: string): string => {
    if (botao === 'C') return '#555555';
    if (botao === '=') return '#8e44ad';
    if (['+', 'x', '-', '÷'].includes(botao)) return '#9b59b6';
    if (['(', ')', '⌫'].includes(botao)) return '#6c3483';
    return '#2c2c54';
  };

  const lidarComToque = (valor: string): void => {
    if (valor === 'C') {
      setExpressao('');
      setResultado('0');
    } else if (valor === '⌫') {
      const novaExpressao = expressao.slice(0, -1);
      setExpressao(novaExpressao);
      setResultado(novaExpressao.length > 0 ? novaExpressao : '0');
    } else if (valor === '=') {
      try {
        const expressaoFormatada = expressao.replace(/x/g, '*').replace(/÷/g, '/');
        const resultadoCalculado = eval(expressaoFormatada);

        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));
      } catch (e) {
        setResultado('Erro');
      }
    } else {
      if (operadores.includes(valor)) {
        if (expressao === '' && valor !== '-') return;

        const ultimoCaractere = expressao.slice(-1);

        if (operadores.includes(ultimoCaractere)) {
          const novaExpressao = expressao.slice(0, -1) + valor;
          setExpressao(novaExpressao);
          setResultado(novaExpressao);
          return;
        }
      }
      const novaExpressao = expressao + valor;
    setExpressao(novaExpressao);
    setResultado(novaExpressao);
  }
};

const Botao: React.FC<BotaoProps> = ({ titulo, corFundo = '#333333', corTexto = '#ffffff' }) => (
  <TouchableOpacity
    style={[styles.botao, { backgroundColor: corFundo }]}
    onPress={() => lidarComToque(titulo)}
  >
    <Text style={[styles.textoBotao, { color: corTexto }]}>{titulo}</Text>
  </TouchableOpacity>
);

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.displayContainer}>
      <Text style={styles.textoExpressao} numberOfLines={1} adjustsFontSizeToFit>
        {expressao || ' '}
      </Text>
      <Text style={styles.textoDisplay} numberOfLines={1} adjustsFontSizeToFit>
        {resultado}
      </Text>
    </View>

    <View style={styles.tecladoContainer}>
      {linhasDeBotoes.map((linha, indexLinha) => (
        <View key={indexLinha} style={styles.linha}>
          {linha.map((botao) => (
            <Botao
              key={botao}
              titulo={botao}
              corFundo={obterCorFundo(botao)}
            />
          ))}
        </View>
      ))}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6c3483',
  },
  textoExpressao: {
    fontSize: 22,
    color: '#a29bfe',
    fontWeight: '300',
    marginBottom: 6,
  },
  textoDisplay: {
    fontSize: 64,
    color: '#ffffff',
    fontWeight: '200',
  },
  tecladoContainer: {
    paddingBottom: 30,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  botao: {
    width: 78,
    height: 78,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBotao: {
    fontSize: 28,
    fontWeight: '500',
    color: '#ffffff',
  },
});