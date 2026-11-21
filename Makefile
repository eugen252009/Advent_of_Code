.DEFAULT_GOAL := help
LANG_GOALS := $(filter js c rust,$(MAKECMDGOALS))
.PHONY: js c rust test
ifneq ($(filter test,$(MAKECMDGOALS)),)
ifneq ($(words $(LANG_GOALS)),1)
$(error Usage: make js|c|rust test [DAY=03])
endif
ifneq ($(words $(MAKECMDGOALS)),2)
$(error Usage: make js|c|rust test [DAY=03])
endif
TEST_FLAG := --test
endif

test:
	@:

js:
	node scripts/run-js.mjs $(TEST_FLAG) $(if $(DAY),'$(DAY)')

c rust:
	python3 scripts/run-native.py $@ $(if $(DAY),'$(DAY)') $(TEST_FLAG)

.PHONY: build help next_year fetch doctor

doctor:
	@sh scripts/doctor.sh

# Positional day: make fetch 03. Reject other additional targets.
ifneq ($(filter fetch,$(MAKECMDGOALS)),)
FETCH_ARGS := $(filter-out fetch,$(MAKECMDGOALS))
ifneq ($(words $(FETCH_ARGS)),0)
ifneq ($(words $(FETCH_ARGS)),1)
$(error Usage: make fetch DAY [YEAR=YYYY])
endif
ifneq ($(shell printf '%s' '$(FETCH_ARGS)' | grep -E '^([0-9]{1,2}|all)$$'),$(FETCH_ARGS))
$(error Usage: make fetch DAY [YEAR=YYYY])
endif
.PHONY: $(FETCH_ARGS)
$(FETCH_ARGS):
	@:
endif
endif

build:
	cd fetchPuzzles && go build -o ../getPuzzle .

next_year:
	@python3 scripts/aoc.py next_year $(if $(YEAR),--year $(YEAR))

fetch:
	@python3 scripts/aoc.py fetch $(FETCH_ARGS) $(if $(YEAR),--year $(YEAR))

help:
	@echo 'make next_year [YEAR=2027]  Jahres-Worktree anlegen (frischer Fork: laufendes Jahr)'
	@echo 'make fetch 03 [YEAR=2027]   Aufgabe und Input für Tag 03 laden'
	@echo 'make fetch all [YEAR=2024] Alle Tage eines abgeschlossenen Jahres laden'
	@echo 'make js|c|rust [DAY=03]    Lösung starten (Standardtag: bootstrap.js)'
	@echo 'make js|c|rust test        Tests der gewählten Sprache ausführen'
	@echo 'make build                 Downloader bauen'
	@echo 'make doctor                Python, Node.js, Go und Cookie prüfen'
