<h1>todos</h1>
<ul>
  <% for(let i=0; i<todos.length; i++) { %>
    <li>
      <%= todos[i].id %>
        :
        <%= todos[i].content %>
    </li>
    <% } %>
</ul>