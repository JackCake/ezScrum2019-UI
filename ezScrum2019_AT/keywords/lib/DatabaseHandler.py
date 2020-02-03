import MySQLdb
import warnings

class DatabaseHandler:

    def __init__(self):
        pass

    def load_database(self, hostUrl, databaseName, account, password, path):
        #db = MySQLdb.connect(host="127.0.0.1", user="root", passwd="1234", db="ezscrum")
        db = MySQLdb.connect( hostUrl, account, password, databaseName)
        # Open and read the file as a single buffer
        fd = open(path , 'r')
        sqlFile = fd.read()
        fd.close()

        # all SQL commands (split on ';')
        sqlCommands = sqlFile.split(';')
        db = MySQLdb.connect(host=hostUrl, user=account, passwd=password, db=databaseName, charset='utf8')
        cursor = db.cursor()

        # ignore useless warnings
        warnings.filterwarnings('ignore', 'Unknown table .*')
        warnings.filterwarnings('ignore', 'Changing sql mode*')
        warnings.filterwarnings('ignore', "'" + 'NO_ZERO_DATE*')

        # Execute every command from the input file
        for command in sqlCommands:
            try:
                if command:
                    cursor.execute(command)
            except MySQLdb.OperationalError:
                print "Command error: " + command
            except MySQLdb.Warning:
                print "Command warning: " + command


    def clean_database(self, hostUrl, account, password, databaseName):
        print 'clean database ' + databaseName
        db = MySQLdb.connect(host=hostUrl, user=account, passwd=password, db=databaseName)
        cursor = db.cursor()

        cursor.execute("Show Tables from " + databaseName)
        result = cursor.fetchall()

        for record in result:
            tableName = record[0]
            print "DELETE FROM `" + tableName + "`"
            cursor.execute("DELETE FROM `" + tableName + "`")

        db.commit()
        




#if __name__ == '__main__':
#    databaseHandler = DatabaseHandler()
#    databaseHandler.clean_database("localhost", "spark", "spark", "robottest")
