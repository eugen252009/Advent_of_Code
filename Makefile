.DEFAULT_GOAL := help
.PHONY: build help next_year fetch

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
	@echo 'make next_year [YEAR=2027]  Neuen Jahres-Worktree vorbereiten'
	@echo 'make fetch 03 [YEAR=2027]   Aufgabe und Input für Tag 03 laden'
	@echo 'make fetch all [YEAR=2024] Alle Tage eines abgeschlossenen Jahres laden'
	@echo 'make build                 Downloader bauen'

.PHONY: js
js:
	bun solutions.js
