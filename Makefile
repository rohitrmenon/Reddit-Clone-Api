.PHONY: run

run: kill-3000
	npm run db:create
	npm run dev

kill-3000:
	-kill -9 `lsof -t -i:3000`
