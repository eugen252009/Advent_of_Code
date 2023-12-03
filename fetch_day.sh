if [ -d ./$1/day-$2]; then
	echo "creating new Folder"
else
	mkdir ./$1/day-$2
	echo "no Dir"
fi
curl https://adventofcode.com/$1/day/$2/input -c cookie > ./$1/day-$2/input
