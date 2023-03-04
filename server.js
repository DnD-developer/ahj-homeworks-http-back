const http = require("http")
const fs = require("fs")
const path = require("path")
const Koa = require("koa")
const koaBody = require("koa-body")
const koaStatic = require("koa-static")
const cors = require("@koa/cors")

const tickets = [
	{
		id: "1",
		title: "Поменять красуку в принтере",
		created: "10.03.19 08:40",
		status: false
	},
	{
		id: "2",
		title: "Поменять красуку в принтере",
		created: "10.03.19 08:40",
		status: false
	}
]

const ticketsFull = [
	{
		id: "1",
		title: "Поменять красуку в принтере",
		created: "10.03.19 08:40",
		status: false,
		description:
			"Ваше приложение должно реализовывать следующий функционал: Отображение всех тикетов Создание нового тикета Удаление тикета Изменение тикета Получение подробного описание тикета Отметка о выполнении каждого тикета"
	},
	{
		id: "2",
		title: "Поменять красуку в принтере",
		created: "10.03.19 08:40",
		status: false,
		description:
			"Ваше приложение должно реализовывать следующий функционал: Отображение всех тикетов Создание нового тикета Удаление тикета Изменение тикета Получение подробного описание тикета Отметка о выполнении каждого тикета"
	}
]

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
			const { id, title, description, status, created } = ctx.request.body

			tickets.push({ id, title, status, created })
			ticketsFull.push({ id, title, description, status, created })

			ctx.response.body = JSON.stringify("create OK")
			return
		case "ticketById":
			ctx.response.body = JSON.stringify(ticketsFull.find(({ id }) => ctx.request.query.id === id).description)

			return
		case "deleteTicket":
			const idDeleteIndex = tickets.findIndex(({ id }) => ctx.request.query.id === id)
			tickets.splice(idDeleteIndex, 1)
			ticketsFull.splice(idDeleteIndex, 1)
			ctx.response.body = JSON.stringify(idDeleteIndex)
			return
		case "editTicket":
			const idEditIndex = tickets.findIndex(({ id }) => ctx.request.query.id === id)
			const requstBody = ctx.request.body
			const ticketForEdit = tickets[idEditIndex]
			const ticketForEditFull = ticketsFull[idEditIndex]

			ticketForEdit.title = requstBody.title

			ticketForEditFull.description = requstBody.description
			ticketForEditFull.title = requstBody.title

			ctx.response.body = JSON.stringify(idEditIndex)
			return

		case "checkTicket":
			const idcheckIndex = tickets.findIndex(({ id }) => ctx.request.query.id === id)

			tickets[idcheckIndex].status = ctx.request.body.status
			ticketsFull[idcheckIndex].status = ctx.request.body.status

			ctx.response.body = JSON.stringify(idcheckIndex)
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
