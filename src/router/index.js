import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/dashboard/:token',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  // ROTAS DE CONFIGURACOES
  {
    path: '/configuracoes-gerais/:token',
    name: 'Configuracoes',
    component: () => import('../components/configuracoes/Configuracoes.vue')
  },
  // ROTAS DE PEDIDOS ONLINE
  {
    path: '/pedidos-online/:token',
    name: 'PedidosOnline',
    component: () => import('../components/pedidosOnline/PedidosOnline.vue')
  },
  // ROTAS DE RELATORIOS
  {
    path: '/relatorio-pedidos/:token',
    name: 'RelatorioPedidos',
    component: () => import('../components/relatorios/RelatorioPedidos.vue')
  },
  {
    path: '/logs/:token',
    name: 'Logs',
    component: () => import('../components/relatorios/Logs.vue')
  },
  // ROTAS DE CONTATOS
  {
    path: '/contatos/:token',
    name: 'Contato',
    component: () => import('../components/contato/Contato.vue')
  },
  // ROTAS DE CONTATOS
  {
    path: '/plano-usuario/:token',
    name: 'PlanoUsuario',
    component: () => import('../components/planos/PlanoUsuario.vue')
  },
  // ROTAS DE USUARIOS
  {
    path: '/cadastrar-usuario/:token',
    name: 'CadastrarUsuario',
    component: () => import('../components/usuarios/CadastrarUsuario.vue')
  },
  {
    path: '/listar-usuario/:token',
    name: 'ListaUsuarios',
    component: () => import('../components/usuarios/ListaUsuarios.vue')
  },
  {
    path: '/editar-usuario/:token/:id',
    name: 'EditarUsuario',
    component: () => import('../components/usuarios/EditarUsuario.vue')
  },
  
  // ROTAS DE LANCHES
  {
    path: '/cadastrar-ingredientes/:token',
    name: 'CadastrarIngredientes',
    component: () => import('../components/lanches/CadastrarIngredientes.vue')
  },
  {
    path: '/adicionar-foto/:token',
    name: 'AdicionarFotoLanche',
    component: () => import('../components/lanches/AdicionarFotoLanche.vue')
  },
  {
    path: '/cadastrar-lanche/:token',
    name: 'CadastrarLanche',
    component: () => import('../components/lanches/CadastrarLanche.vue')
  },
  {
    path: '/listar-lanche/:token',
    name: 'ListarLanches',
    component: () => import('../components/lanches/ListarLanches.vue')
  },
  {
    path: '/editar-lanche/:token/:id',
    name: 'EditarLanche',
    component: () => import('../components/lanches/EditarLanche.vue')
  },
  {
    path: '/cadastrar-adicionais/:token',
    name: 'CadastrarAdicionais',
    component: () => import('../components/lanches/CadastrarAdicionais.vue')
  },
  {
    path: '/editar-adicionais/:token/:id',
    name: 'EditarAdicionais',
    component: () => import('../components/lanches/EditarAdicionais.vue')
  },
  // ROTAS DE BEBIDAS
  {
    path: '/cadastrar-bebida/:token',
    name: 'CadastrarBebida',
    component: () => import('../components/bebidas/CadastrarBebida.vue')
  },
  {
    path: '/adicionar-foto-bebida/:token',
    name: 'AdicionarFotoBebida',
    component: () => import('../components/bebidas/AdicionarFotoBebida.vue')
  },
  {
    path: '/listar-bebida/:token',
    name: 'ListarBebidas',
    component: () => import('../components/bebidas/ListarBebidas.vue')
  },
  {
    path: '/editar-bebida/:token/:id',
    name: 'EditarBebida',
    component: () => import('../components/bebidas/EditarBebida.vue')
  },
  // ROTAS TAXA DE ENTREGA
  {
    path: '/listar-taxa/:token',
    name: 'ListarTaxaEntrega',
    component: () => import('../components/taxa_entrega/ListarTaxaEntrega.vue')
  },
  {
    path: '/editar-taxa/:token/:id',
    name: 'EditarTaxa',
    component: () => import('../components/taxa_entrega/EditarTaxa.vue')
  },
  // ROTAS DE PEDIDOS
  {
    path: '/ver-pedido/:token/:id',
    name: 'VerPedido',
    component: () => import('../components/pedidos/VerPedido.vue')
  },
  {
    path: '/',
    name: 'DadosUsuario',
    component: () => import('../components/pedidos/DadosUsuario.vue')
  },
  {
    path: '/dadosLanche',
    name: 'DadosLanche',
    component: () => import('../components/pedidos/DadosLanche.vue')
  },
  {
    path: '/dadosbebida',
    name: 'DadosBebida',
    component: () => import('../components/pedidos/DadosBebida.vue')
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: () => import('../components/pedidos/Carrinho.vue')
  },
  {
    path: '/forma-pagamento',
    name: 'DadosPagamento',
    component: () => import('../components/pedidos/DadosPagamento.vue')
  },
  {
    path: '/confirmar-pedido',
    name: 'ConfirmarPedido',
    component: () => import('../components/pedidos/ConfirmarPedido.vue')
  },
  // ROTAS DE CLIENTES
  {
    path: '/clientes/:token',
    name: 'Clientes',
    component: () => import('../components/clientes/PesquisarCliente.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
