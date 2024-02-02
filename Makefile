.PHONY: run

run: kill-8080
	npm run db:create
	npm run dev

kill-8080:
	-kill -9 `lsof -t -i:8080`
