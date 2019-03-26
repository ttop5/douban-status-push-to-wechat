GIT_VERSION = $(shell git describe --always --dirty)
PROJECT     = douban-status-push-to-wechat

build: src package.json
	docker build -t $(PROJECT):$(GIT_VERSION) .

clean:
	rm -rf log
	docker images | grep -E "($(PROJECT))" | awk '{print $$3}' | uniq | xargs -I {} docker rmi --force {}
