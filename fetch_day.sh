if [ -z "$1" ]; then 
	year=$(date +%Y)
else 
	year=$1
fi
if [ -z "$2" ]; then 
	today=$(date +%-d)
else
	today=$2
fi

if [ -d ./$year/day-$today]; then
	echo "creating new Folder"
else
	mkdir ./$year/day-$today
fi

curl https://adventofcode.com/$year/day/$today/input -b cookie > ./$year/day-$today/input
