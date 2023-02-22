const http = require("http")
const fs = require("fs")
const path = require("path")
const Koa = require("koa")
const koaBody = require("koa-body")
const koaStatic = require("koa-static")
const cors = require("@koa/cors")
const uuid = require("uuid")

const tickets = []

const ticketsFull = []

const app = new Koa()

app.use(cors())

app.use(
	koaBody({
		urlencoded: true,
		multipart: true
	})
)

app.use(ctx => {
	const { method } = ctx.request.query

	switch (method) {
		case "allTickets":
			ctx.response.body = JSON.stringify(tickets)
			return
		case "createTicket":
			const { name, description, status, created } = ctx.request.body
			const id = uuid.v4()

			tickets.push({ idTicket, name, status, created })
			ticketsFull.push({ idTicket, name, description, status, created })

			ctx.response.body = JSON.stringify({ id })
			return
		case "ticketById":
			({ id }) = ctx.request.query

			ctx.response.body = ticketsFull.find(({ idTicket }) => id === idTicket)
			return
		case "deleteTicket":
            ({ id }) = ctx.request.query

            const idDeleteIndex = tickets.findIndex(({idTicket})=> id === idTicket)

            tickets.splice(idDeleteIndex, 1)
            ticketsFull.splice(idDeleteIndex, 1)
			ctx.response.body = JSON.stringify(tickets)
			return
		case "editTicket":
            ({ id }) = ctx.request.query

            const idEditIndex = tickets.findIndex(({idTicket})=> id === idTicket)

            tickets.splice(idEditIndex, 1, { idTicket, name, status, created })
            ticketsFull.splice(idEditIndex, 1, { idTicket, name, description, status, created })

			ctx.response.body = JSON.stringify(tickets)
			return
		default:
			ctx.response.status = 200
			return
	}
})

const server = http.createServer(app.callback())

const port = 7070

server.listen(port, err => {
	if (err) {
		console.log(err)

		return
	}

	console.log("Server is listening to " + port)
})
