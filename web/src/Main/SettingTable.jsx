import React from 'react';
import {forwardRef} from 'react';
import MaterialTable from 'material-table';
import {makeStyles} from "@material-ui/core";
import Icons from './TableIcons';

const useStyles = makeStyles(theme => ({
    page : {
        marginTop: theme.spacing(6),
        marginBottom : theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));
const SettingTable = props => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            
            {   
                title: '권장칼로리', 
                field: 'recommendCal' ,
                editable : 'never',
            },
            {
                title: '설정칼로리',
                field: 'SettingCal',
            },
        ],
        data: [
            { recommendCal: 250+'kcal' , SettingCal: '' + 'kcal' },
            
        ],
});

return (
    <div className = {classes.page}>
    <MaterialTable
        icons ={Icons}
        title="배식설정"
        columns={state.columns}
        data={state.data}
        options = {{
            search : false,
            paging : false,
            draggable : false,
            sorting : false,
            actionsColumnIndex : 2,
            
        }}
        localization={{
            header: {
                actions : '',
                
            }
        }}
        
        editable={{
            onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                    if (oldData) {
                    setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                    }
                }, 600);
                }),
            }}
    />
    </div>
    );
}

export default SettingTable;