import { createRouter, createWebHistory } from 'vue-router'
import Pedido from '../views/Pedido.vue'

const routes = [
  {
    path: '/',
    name: 'Pedido',
    component: Pedido
  },
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
  // ROTAS DE BEBIDAS
  {
    path: '/cadastrar-bebida/:token',
    name: 'CadastrarBebida',
    component: () => import('../components/bebidas/CadastrarBebida.vue')
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
    path: '/pedidos/:token',
    name: 'PedidosFeitos',
    component: () => import('../components/pedidos/PedidosFeitos.vue')
  },
  {
    path: '/ver-pedido/:token/:id',
    name: 'VerPedido',
    component: () => import('../components/pedidos/VerPedido.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
